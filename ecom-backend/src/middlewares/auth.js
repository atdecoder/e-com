const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyPassword, decodeToken } = require('../utils/CustomMethods');
const db = require('../db');

async function authenticate(req, res, next) {
    try {
        const { email, password } = req.body;
        const stmt = db.prepare('SELECT id, email, password FROM users WHERE email = ?');
        const user = stmt.get(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const payload = {
            userId: user._id
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.locals.userId = user._id;
        res.locals.token = token;
        // next();
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            statusCode: 200,
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

function verifyJwt(req, res, next) {
    const authHeader = req.cookies?.token;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token format' });
    }

    const token = authHeader

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = {
    authenticate,
    verifyJwt,
};