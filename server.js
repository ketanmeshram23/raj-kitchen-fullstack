require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

// ✅ HEALTH FIRST
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// ✅ ROOT
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;

// ✅ START SERVER FIRST
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ THEN CONNECT DB (NON-BLOCKING)
connectDB().catch(err => console.log(err));