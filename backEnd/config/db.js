const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();



// Create Connection
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sky_mind_research_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check Connection
connection.getConnection((err, conn) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MySQL Connected Successfully");
        conn.release();
    }
});

module.exports = connection;