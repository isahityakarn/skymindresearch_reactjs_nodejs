const db = require("../config/db");

const User = {
    // Find user by email
    findByEmail: async (email) => {
        try {
            const [rows] = await db.query(
                "SELECT * FROM users WHERE email = ? LIMIT 1",
                [email]
            );
            return rows[0] || null;
        } catch (error) {
            console.error("Error in User.findByEmail:", error.message);
            throw error;
        }
    },

    // Find user by ID
    findById: async (id) => {
        try {
            const [rows] = await db.query(
                "SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1",
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error("Error in User.findById:", error.message);
            throw error;
        }
    },

    // Create a new user
    create: async ({ name, email, password }) => {
        try {
            const [result] = await db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, password]
            );
            return {
                id: result.insertId,
                name,
                email
            };
        } catch (error) {
            console.error("Error in User.create:", error.message);
            throw error;
        }
    }
};

module.exports = User;
