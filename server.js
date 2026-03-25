require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// root route
app.get('/', (req, res) => {
  res.send('🚀 Raj Kitchen Backend is LIVE');
});

// health check (IMPORTANT)
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;

// VERY IMPORTANT LINE
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});