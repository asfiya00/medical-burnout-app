const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./db"); // MongoDB connection

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Import User Routes
const stressRoutes = require("./routes/stressRoutes"); // Import Stress Routes

const UserResponse = require('./models/UserResponse');

dotenv.config();
connectDB();

const app = express();

// ✅ Use CORS middleware (must be above route definitions)
app.use(cors());

// Built-in middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stress", stressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
