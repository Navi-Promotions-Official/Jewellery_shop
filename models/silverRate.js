// models/silverRate.js
const mongoose = require("mongoose");

const silverRateSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SilverRate", silverRateSchema);
