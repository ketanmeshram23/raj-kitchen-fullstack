require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// 🔥 ROOT FIRST (must respond instantly)
app.get('/', (req, res) => {
  res.status(200).send('🚀 Server is LIVE');
});

app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// 🔥 START SERVER FIRST (IMPORTANT)
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // 🔥 CONNECT DB AFTER SERVER START
  try {
    await connectDB();
  } catch (err) {
    console.error("DB error:", err);
  }
});