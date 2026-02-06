const router = require('express').Router();
const Disease = require('../models/Disease');

router.get('/', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) return res.status(404).json({ message: 'Disease not found' });
    res.json(disease);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
