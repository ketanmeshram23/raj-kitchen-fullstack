require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*', // In production: restrict to your domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Serve Static Frontend Files ──────────────────────────────────────────────
// Serve original frontend files from the parent directory (where index.html, etc. live)
app.use(express.static(path.join(__dirname, '..')));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/admin', require('./routes/auth'));
app.use('/admin', require('./routes/stats'));
app.use('/menu', require('./routes/menu'));
app.use('/category', require('./routes/category'));
app.use('/review', require('./routes/review'));

// ─── Admin Page Routes (serve HTML files) ────────────────────────────────────
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin-login.html'));
});

app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin-dashboard.html'));
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Raj Kitchen API is running 🍛', timestamp: new Date() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Raj Kitchen API Server running at http://localhost:${PORT}`);
  console.log(`📋 Admin Login:     http://localhost:${PORT}/admin-login`);
  console.log(`🎛️  Admin Dashboard: http://localhost:${PORT}/admin-dashboard`);
  console.log(`🍛 Public Menu API: http://localhost:${PORT}/menu\n`);
});
