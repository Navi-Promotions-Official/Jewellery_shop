// models/GoldEstimation.js
const mongoose = require('mongoose');

const goldEstimationSchema = new mongoose.Schema({
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

module.exports = mongoose.model('GoldEstimation', goldEstimationSchema);
