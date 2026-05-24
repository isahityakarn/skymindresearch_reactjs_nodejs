const express = require("express");
var cors = require('cors');
const app = express();
require("dotenv").config();

// Initialize Database connection & auto-table/seeding setup
require("./config/db");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json());

// Import & Use Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("Node.js Express App Running Successfully checking port");
});

// API Route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API Working"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});