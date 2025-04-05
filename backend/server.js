const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db"); // MongoDB connection
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Import User Routes
const stressRoutes = require("./routes/stressRoutes"); // Import Stress Routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);
// User Profile Routes
app.use("/api/user", userRoutes); // ✅ Correctly added

// Stress Analysis Routes
app.use("/api/stress", stressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
