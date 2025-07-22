// models/Rate.js
const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  metal: {
    type: String,
    enum: ["gold", "silver"],
    required: true,
    unique: true
  },
  rate: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Rate", rateSchema);
