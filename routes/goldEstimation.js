const express = require("express");
const router = express.Router();
const GoldEstimation = require("../models/GoldEstimation");

router.post("/save-estimation", async (req, res) => {
  try {
    const { name, phone, address, items } = req.body;

    const newEstimation = new GoldEstimation({
      name,
      phone,
      address,
      items
    });

    await newEstimation.save();
    res.status(201).json({ success: true, estimation: newEstimation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save estimation" });
  }
});

module.exports = router;
