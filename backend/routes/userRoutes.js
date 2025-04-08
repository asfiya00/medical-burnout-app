const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware"); // Import middleware
const router = express.Router();
const UserResponse = require("../models/UserResponse");//Impoprt UserResponse Schema 

// Protected Route - Get User Profile
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Welcome to your profile!",
        user: req.user,
    });
});

// ✅ POST - Submit Mood & Stress Data
router.post("/submit", authMiddleware, async (req, res) => {
    const { mood, stressLevel, recommendations } = req.body;

    // 🛡 Basic validation
    if (!mood || !stressLevel) {
        return res.status(400).json({
            error: "Please provide both mood and stressLevel fields.",
        });
    }

    try {
        const newResponse = new UserResponse({
            username: req.user.name,
            mood,
            stressLevel,
            recommendations: recommendations || [],
        });

        await newResponse.save();
        res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
        res.status(400).json({ error: "Error saving data", details: error.message });
    }
});

// ✅ GET - Retrieve All Responses for Logged-in User
router.get("/responses", authMiddleware, async (req, res) => {
    try {
        const responses = await UserResponse.find({ username: req.user.name });
        res.status(200).json(responses);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving data", details: error.message });
    }
});

module.exports = router;
