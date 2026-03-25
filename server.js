require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// ✅ CONNECT ROUTES (VERY IMPORTANT)
app.use('/api/menu', require('./routes/menu'));
app.use('/api/category', require('./routes/category'));
app.use('/api/review', require('./routes/review'));
app.use('/api/auth', require('./routes/auth'));

// ✅ health route (Render)
app.get('/api/health', (req, res) => {
res.status(200).send('OK');
});

// ✅ root route
app.get('/', (req, res) => {
res.send('🚀 Raj Kitchen Backend is LIVE');
});

// ❗ KEEP THIS ALWAYS LAST
app.use((req, res) => {
res.status(200).send('OK');
});

// port
const PORT = process.env.PORT || 10000;

// start server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

// connect DB
connectDB().catch(err => console.log(err));
