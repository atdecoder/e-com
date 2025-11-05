const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

const verifyPassword = async (inputPassword, storedHashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, storedHashedPassword);
        if (match) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const decodeToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                status: false,
                message: "Unauthorized"
            };
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        return {
            statusCode: 200,
            status: true,
            message: "success",
            data: decoded
        };
    } catch (error) {
        return {
            statusCode: 401,
            status: false,
            message: "Failed",
            error: error.message
        };
    }
}


module.exports = {
    verifyPassword,
    hashPassword,
    decodeToken,
}
