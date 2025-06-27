// app.js

const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { protect } = require("./middlewares/authMiddleware");

dotenv.config();
const app = express();

app.use(express.json());

// Public Routes
app.use("/api/users", userRoutes);

// Protected Routes
app.use("/api/groups", protect, groupRoutes);
app.use("/api/expenses", protect, expenseRoutes);
app.use("/api/payments", protect, paymentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: "Something went wrong." });
});

module.exports = app;
