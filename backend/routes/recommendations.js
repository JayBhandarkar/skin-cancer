const router = require('express').Router();
const Recommendation = require('../models/Recommendation');
const auth = require('../middleware/auth');

const getRecommendations = (disease) => {
  const recommendations = {
    'Melanoma': {
      treatments: ['Surgical excision', 'Immunotherapy', 'Targeted therapy'],
      medications: ['Pembrolizumab', 'Nivolumab', 'Dabrafenib'],
      lifestyle: ['Avoid sun exposure', 'Use SPF 50+ sunscreen', 'Regular skin checks'],
      followUp: 'Immediate consultation with oncologist required'
    },
    'Basal Cell Carcinoma': {
      treatments: ['Mohs surgery', 'Excisional surgery', 'Radiation therapy'],
      medications: ['Imiquimod cream', 'Fluorouracil cream', 'Vismodegib'],
      lifestyle: ['Sun protection', 'Avoid tanning beds', 'Regular dermatology visits'],
      followUp: 'Consult dermatologist within 2 weeks'
    },
    'Squamous Cell Carcinoma': {
      treatments: ['Surgical removal', 'Cryotherapy', 'Photodynamic therapy'],
      medications: ['Fluorouracil', 'Imiquimod', 'Cemiplimab'],
      lifestyle: ['Sun avoidance', 'Protective clothing', 'Monthly self-exams'],
      followUp: 'Urgent dermatologist consultation recommended'
    },
    'Actinic Keratosis': {
      treatments: ['Cryotherapy', 'Topical medications', 'Chemical peels'],
      medications: ['Fluorouracil cream', 'Imiquimod', 'Diclofenac gel'],
      lifestyle: ['Daily sunscreen use', 'Avoid peak sun hours', 'Wear protective clothing'],
      followUp: 'Follow-up in 3-6 months'
    }
  };
  return recommendations[disease] || recommendations['Melanoma'];
};

router.get('/:disease', async (req, res) => {
  try {
    const recommendations = getRecommendations(req.params.disease);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/save', auth, async (req, res) => {
  try {
    const recommendation = new Recommendation(req.body);
    await recommendation.save();
    res.status(201).json(recommendation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
