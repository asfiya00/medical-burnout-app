const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const StressResult = require("../models/stressModel");

// ✅ Protected Route: Analyze stress and store result in database
router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Simple stress calculation (Modify if needed)
    const total = answers.reduce((acc, num) => acc + num, 0);
    const stressLevel = Math.min(100, (total / (answers.length * 5)) * 100); // Convert to percentage

    // Save result in MongoDB
    const newStressResult = new StressResult({
      userId,
      stressLevel,
    });

    await newStressResult.save();

    res.status(200).json({
      message: "Stress analysis completed",
      stressLevel: `${Math.round(stressLevel)}%`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ New Route: Get stress history for the logged-in user
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const stressHistory = await StressResult.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User stress history retrieved successfully",
      data: stressHistory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
