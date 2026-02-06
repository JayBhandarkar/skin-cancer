const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  detection: { type: mongoose.Schema.Types.ObjectId, ref: 'Detection' },
  disease: { type: String, required: true },
  treatments: [String],
  medications: [String],
  lifestyle: [String],
  followUp: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
