const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const StressResult = require("../models/stressModel");

// Route 1: Analyze Stress
router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    const total = answers.reduce((acc, num) => acc + num, 0);
    const stressLevel = Math.min(100, (total / (answers.length * 5)) * 100);

    const newStressResult = new StressResult({ userId, stressLevel });
    await newStressResult.save();

    res.status(200).json({
      message: "Stress analysis completed",
      stressLevel: `${Math.round(stressLevel)}%`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Route 2: Stress History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await StressResult.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "User stress history retrieved successfully",
      data: history,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Route 3: Insights & Recommendation
router.get("/insights", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const stressHistory = await StressResult.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    if (stressHistory.length === 0) {
      return res.status(200).json({ message: "No stress records found", insights: [] });
    }

    const avgStress =
      stressHistory.reduce((acc, entry) => acc + entry.stressLevel, 0) / stressHistory.length;

    let recommendation = "";
    if (avgStress > 80) {
      recommendation =
        "Your stress levels are very high. Consider relaxation techniques like deep breathing, meditation, or professional support.";
    } else if (avgStress > 50) {
      recommendation =
        "Your stress is moderate. Engage in regular exercise, social activities, and self-care practices.";
    } else {
      recommendation = "Your stress is under control. Keep maintaining a healthy lifestyle.";
    }

    res.status(200).json({
      message: "Stress insights generated successfully",
      averageStress: `${Math.round(avgStress)}%`,
      recommendation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
const EmergencyRequest = require("../models/emergencyModel"); // ⬅️ Add this at the top if not already

// Emergency Support Trigger API
router.post("/emergency", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { comment } = req.body;

    const emergency = new EmergencyRequest({
      userId,
      comment,
    });

    await emergency.save();

    res.status(200).json({
      message: "Emergency assistance requested. Please stay calm. Help is on the way!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
