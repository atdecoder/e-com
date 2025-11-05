const { v4: uuidv4 } = require("uuid");
const db = require('../../db');

async function findAll({ limit = 100, offset = 0, category, search }) {
    try {
        let sql = `
        SELECT id, name, price, category, in_stock, created_at
        FROM products
        `;
        const params = [];
        const where = [];

        if (category) {
            where.push("category = ?");
            params.push(category);
        }

        if (search) {
            where.push("name LIKE ?");
            params.push(`%${search}%`);
        }

        if (where.length) {
            sql += " WHERE " + where.join(" AND ");
        }

        sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        params.push(limit, offset);

        const stmt = db.prepare(sql);
        const result = stmt.all(...params);

        return {
            statusCode: 200,
            status: true,
            data: result,
            message: "Products fetched successfully",
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Failed to fetch products",
        };
    }
}

async function addData({ id = uuidv4(), name, price, category, in_stock = true }) {
    try {
        const stmt = db.prepare(`
        INSERT INTO products (id, name, price, category, in_stock, created_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `);

        const info = stmt.run(id, name, price, category, in_stock ? 1 : 0);

        if (info.changes === 1) {
            return {
                statusCode: 201,
                status: true,
                data: { id, name, price, category, in_stock },
                message: "Product added successfully",
            };
        } else {
            return {
                statusCode: 400,
                status: false,
                message: "Failed to add product",
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            status: false,
            message: "Error while adding product",
        };
    }
}

module.exports = { findAll, addData };
