// routes/customer.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// POST /api/customer/create
router.post('/create', async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const newCustomer = new Customer({ name, phone, email });
    await newCustomer.save();

    res.status(200).json({ message: 'Customer saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving customer' });
  }
});

// router.get('/all', async (req, res) => {
//   try {
//     const customers = await Customer.find().sort({ createdAt: -1 });
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching customers' });
//   }
// });

// UPDATE customer
router.put('/update/:id', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, { name, phone, email });
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating customer' });
  }
});

// DELETE customer
router.delete('/delete/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
});

module.exports = router;
