// models/GoldEstimation.js
const mongoose = require('mongoose');

const silverEstimationSchema = new mongoose.Schema({
  items: [
    {
      type: {
        type: String
      },
      item: String,
      weight: Number,
      count: Number,
      rate: Number,
      total: Number
    }
  ]
});

module.exports = mongoose.model('silverEstimation', silverEstimationSchema);
