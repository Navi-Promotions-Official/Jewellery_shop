const express = require('express');
const router = express.Router();
const SilverEstimation = require('../models/SilverEstimation');

router.post('/save-estimation', async (req, res) => {
  try {
    const newEstimation = new SilverEstimation({
      items: req.body.items
    });

    await newEstimation.save();
    res.json({ message: 'Estimation saved successfully' });
  } catch (error) {
    console.error('Error saving estimation:', error);
    res.status(500).json({ message: 'Error saving estimation', error });
  }
});

module.exports = router;
