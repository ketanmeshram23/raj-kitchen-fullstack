require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// ─── Connect to MongoDB ─────────────────────────────
connectDB().catch(err => {
  console.error("DB connection failed:", err);
});

// ─── Middleware ─────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Serve Static Files (FIXED) ─────────────────────
app.use(express.static(__dirname));

// ─── API Routes ─────────────────────────────────────
app.use('/admin', require('./routes/auth'));
app.use('/admin', require('./routes/stats'));
app.use('/menu', require('./routes/menu'));
app.use('/category', require('./routes/category'));
app.use('/review', require('./routes/review'));

// ─── Admin Pages ────────────────────────────────────
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// ─── Health Check ───────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Raj Kitchen API is running 🍛',
    timestamp: new Date()
  });
});

// ─── Root Route (IMPORTANT) ─────────────────────────
app.get('/', (req, res) => {
  res.status(200).send('Server is live 🚀');
});

// ─── 404 Handler ────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`
  });
});

// ─── Error Handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error.'
  });
});

// ─── Start Server ───────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});