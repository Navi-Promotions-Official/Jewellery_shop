const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const goldEstimationRoutes = require('./routes/goldEstimation');
const silverEstimationRoutes = require('./routes/silverEstimation');
const customerRoutes = require('./routes/customer');
const Customer = require('./models/Customer');
const invoiceRoutes = require('./routes/invoice');
const Invoice = require('./models/Invoice');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to handle form data
app.use(express.static(path.join(__dirname, "public"))); // serve static files

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use('/goldEstimation', goldEstimationRoutes);
app.use('/silverEstimation', silverEstimationRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/invoice', invoiceRoutes);


app.get('/customerdetails', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.render('customerdetails', { customers });
  } catch (err) {
    res.send('Error loading customer details');
  }
});

app.get('/invoicehistory', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.render('invoicehistory', { invoices });
  } catch (err) {
    res.send('Error loading invoice history');
  }
});

// Route for home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/goldestimation', (req, res) => {
  res.render('goldestimation');
});

app.get('/silverEstimation', (req, res) => {
  res.render('silverEstimation');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/customerdetails', (req, res) => {
  res.render('customerdetails'); // Make sure customerdetails.ejs exists
});

app.get('/invoicehistory', (req, res) => {
  res.render('invoicehistory'); // Make sure invoicehistory.ejs exists
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
