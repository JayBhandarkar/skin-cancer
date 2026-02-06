const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  symptoms: [String],
  causes: [String],
  treatments: [String],
  prevention: [String],
  image: String,
  severity: { type: String, enum: ['mild', 'moderate', 'severe'] },
  type: { type: String, default: 'cancer' }
});

module.exports = mongoose.model('Disease', diseaseSchema);
