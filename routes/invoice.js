// routes/invoice.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create invoice
router.post('/create', async (req, res) => {
  try {
    const { name, phone, email, invoiceId, date, amount, status } = req.body;

    const newInvoice = new Invoice({
      name,
      phone,
      email,
      invoiceId,
      date,
      amount,
      status
    });

    await newInvoice.save();
    res.status(200).json({ message: 'Invoice saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving invoice' });
  }
});

// Get all invoices
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
});

// Update invoice
router.put('/update/:id', async (req, res) => {
  try {
    const { name, phone, email, invoiceId, date, amount, status } = req.body;
    await Invoice.findByIdAndUpdate(req.params.id, { name, phone, email, invoiceId, date, amount, status });
    res.json({ message: 'Invoice updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating invoice' });
  }
});

// Delete invoice
router.delete('/delete/:id', async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting invoice' });
  }
});


module.exports = router;
