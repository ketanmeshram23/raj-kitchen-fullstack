require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// DB connect
connectDB();

// VERY IMPORTANT: root route FIRST
app.get('/', (req, res) => {
  res.send('🚀 Server is LIVE');
});

// health route
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// PORT (Railway)
const PORT = process.env.PORT;
console.log("PORT FROM RAILWAY:", process.env.PORT);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});