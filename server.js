require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// IMPORTANT: Root route
app.get('/', (req, res) => {
  res.send('🚀 Raj Kitchen Backend is LIVE');
});

// Health route (Render uses this sometimes)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// VERY IMPORTANT
const PORT = process.env.PORT || 10000;

// Bind correctly
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});