const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  disease: { type: String, required: true },
  confidence: { type: Number, required: true },
  severity: { type: String, enum: ['mild', 'moderate', 'severe'] },
  recommendations: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Detection', detectionSchema);
