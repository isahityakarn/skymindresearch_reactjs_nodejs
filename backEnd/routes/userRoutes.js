const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    getUserProfile,
    logoutUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Route: Register user
// POST /api/users/register
router.post("/register", registerUser);

// Route: Authenticate user
// POST /api/users/login
router.post("/login", loginUser);

// Route: Logout user
// POST /api/users/logout
router.post("/logout", logoutUser);

// Route: Get user profile
// GET /api/users/profile (Protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;
