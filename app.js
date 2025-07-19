const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const goldEstimationRoutes = require('./routes/goldEstimation');
const silverEstimationRoutes = require('./routes/silverEstimation');


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


// Route for home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/goldestimation', (req, res) => {
  res.render('goldestimation');
});

app.get('/silverestimation', (req, res) => {
  res.render('silverestimation');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
