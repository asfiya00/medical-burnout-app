const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware"); // Import middleware
const router = express.Router();

// Protected Route - Get User Profile
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
        user: req.user,
    });
});

module.exports = router;
