const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const authMiddleware = require('../middleware/auth');

// GET /admin/stats — admin only
router.get('/stats', authMiddleware, getStats);

module.exports = router;
