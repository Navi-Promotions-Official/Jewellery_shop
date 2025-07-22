// routes/rates.js
const express = require("express");
const router = express.Router();
const Rate = require("../models/Rate");
const SilverRate = require("../models/silverRate");

// POST: Update gold rate
router.post("/update-gold", async (req, res) => {
  const { rate } = req.body;
  try {
    const updatedRate = await Rate.findOneAndUpdate(
      { metal: "gold" },
      { rate, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, rate: updatedRate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update gold rate" });
  }
});

// GET: Fetch current gold rate
// routes/rates.js
router.get("/gold", async (req, res) => {
  try {
    const goldRate = await Rate.findOne({ metal: "gold" });
    if (!goldRate) return res.status(404).json({ message: "Gold rate not set" });
    res.json({ rate: goldRate.rate });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gold rate" });
  }
});


// GET: Fetch current silver rate
router.get("/silver", async (req, res) => {
  try {
    const silverRate = await Rate.findOne({ metal: "silver" });
    if (!silverRate) return res.status(404).json({ message: "Silver rate not set" });
    res.json({ rate: silverRate.rate });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch silver rate" });
  }
});


// POST Silver Rate (Update)
router.post("/silver", async (req, res) => {
  const { rate } = req.body;
  try {
    const updated = await SilverRate.findOneAndUpdate(
      {},
      { rate, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ rate: updated.rate });
  } catch (err) {
    res.status(500).json({ message: "Error updating silver rate" });
  }
});

module.exports = router;
