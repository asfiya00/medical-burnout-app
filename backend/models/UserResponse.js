const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mood: { type: String, required: true },
  stressLevel: { type: Number, required: true },
  recommendations: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
