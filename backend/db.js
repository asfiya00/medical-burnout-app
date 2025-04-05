const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Exit the app on failure
    }
};

module.exports = connectDB;
