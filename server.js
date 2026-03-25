require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// middleware
app.use(express.json());

// ✅ health route (IMPORTANT for Render)
app.get('/api/health', (req, res) => {
res.status(200).send('OK');
});

// ✅ root route (what you see in browser)
app.get('/', (req, res) => {
res.send('🚀 Raj Kitchen Backend is LIVE');
});

// ✅ safe fallback (handles unknown routes for Render)
app.use((req, res) => {
res.status(200).send('OK');
});

// port
const PORT = process.env.PORT || 10000;

// start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

// connect DB AFTER server starts
connectDB().catch(err => console.log(err));
