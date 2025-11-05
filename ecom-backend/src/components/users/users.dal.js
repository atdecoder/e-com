const db = require('../../db');
const { v4: uuidv4 } = require('uuid');

function findAll(req, res) {
    try {
        const stmt = db.prepare(
            `SELECT id, email, created_at FROM users ORDER BY created_at DESC`
        );
        const result = stmt.all();

        return {
            statusCode: 200,
            status: true,
            data: result,
            message: "Success",
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed to fetch users",
        };
    }
}

function findById(userId) {
    try {
        const stmt = db.prepare(
            `SELECT id, email, created_at FROM users WHERE id = ?`
        );
        const result = stmt.get(userId);

        if (result) {
            return {
                statusCode: 200,
                status: true,
                data: result,
                message: "Success",
            };
        }

        return {
            statusCode: 404,
            status: false,
            data: [],
            message: "User not found",
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed to get user by ID",
        };
    }
}

function findByEmail({ email }) {
    try {
        const stmt = db.prepare(
            `SELECT id, email, password, created_at FROM users WHERE email = ?`
        );
        const result = stmt.get(email);

        if (result) {
            return {
                statusCode: 200,
                status: true,
                data: result,
                message: "Success",
            };
        }

        return {
            statusCode: 404,
            status: false,
            data: [],
            message: "User not found",
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed to get user by email",
        };
    }
}

function addData({ email, password }) {
    try {
        const id = uuidv4();

        const stmt = db.prepare(
            `INSERT INTO users (id, email, password) VALUES (?, ?, ?)`
        );
        const info = stmt.run(id, email, password);

        if (info.changes === 1) {
            return {
                statusCode: 201,
                status: true,
                data: { id, email },
                message: "User created successfully",
            };
        }

        return {
            statusCode: 400,
            status: false,
            message: "Failed to create user",
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            status: false,
            message: "Error while adding user",
        };
    }
}

module.exports = {
    addData,
    findById,
    findAll,
    findByEmail,
};