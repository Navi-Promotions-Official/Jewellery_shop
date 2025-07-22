const mongoose = require('mongoose');

const silverEstimationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  items: [
    {
      type: { type: String },
      item: String,
      weight: Number,
      count: Number,
      rate: Number,
      total: Number
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SilverEstimation', silverEstimationSchema);
