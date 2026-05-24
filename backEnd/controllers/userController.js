const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { sendError, sendSuccess } = require("../utils/responseHelper");

// Helper function to generate JWT token
const generateToken = (user) => {

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return token;
};


/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return sendError(res, 400, "Please provide both email and password");
        }

        // 2. Find user and verify password
        const user = await User.findByEmail(email.toLowerCase().trim());
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return sendError(res, 401, "Invalid email or password");
        }

        // 3. Send success response with token
        return sendSuccess(res, 200, "Login successful", {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            },
            token: generateToken(user.id)
        });

    } catch (error) {
        console.error("Error in loginUser controller:", error.message);
        return sendError(res, 500, "Internal server error during login");
    }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            return sendError(res, 400, "Please fill in all fields (name, email, password)");
        }

        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return sendError(res, 400, "Please enter a valid email address");
        }

        if (password.length < 6) {
            return sendError(res, 400, "Password must be at least 6 characters long");
        }

        const normalizedEmail = email.toLowerCase().trim();

        // 2. Check if user already exists
        const userExists = await User.findByEmail(normalizedEmail);
        if (userExists) {
            return sendError(res, 400, "User with this email already exists");
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        // 5. Send success response with token
        return sendSuccess(res, 201, "User registered successfully", {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token: generateToken(newUser.id)
        });

    } catch (error) {
        console.error("Error in registerUser controller:", error.message);
        return sendError(res, 500, "Internal server error during registration");
    }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
    try {
        // req.user is set by protect middleware
        return sendSuccess(res, 200, "Profile retrieved successfully", {
            user: req.user
        });
    } catch (error) {
        console.error("Error in getUserProfile controller:", error.message);
        return sendError(res, 500, "Internal server error retrieving user profile");
    }
};

/**
 * @desc    Logout user / clear token
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = async (req, res) => {
    try {
        return sendSuccess(res, 200, "Logout successful");
    } catch (error) {
        console.error("Error in logoutUser controller:", error.message);
        return sendError(res, 500, "Internal server error during logout");
    }
};

module.exports = {
    loginUser,
    registerUser,
    getUserProfile,
    logoutUser
};

