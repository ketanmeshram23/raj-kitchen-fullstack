const express = require('express');
const router = express.Router();
const { adminLogin, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST /admin/login
router.post('/login', adminLogin);

// GET /admin/verify — verify token is still valid
router.get('/verify', authMiddleware, verifyToken);

module.exports = router;
