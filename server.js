require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

// health
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// root
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// 🚨 CATCH ALL (FINAL FIX)
app.get('*', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// DB after
connectDB().catch(err => console.log(err));