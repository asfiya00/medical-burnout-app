const mongoose = require("mongoose");

const stressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stressLevel: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StressResult = mongoose.model("StressResult", stressSchema);

module.exports = StressResult;
