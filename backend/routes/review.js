const express = require('express');
const router = express.Router();
const { addReview, getAllReviews, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');

// POST /review/add — public
router.post('/add', addReview);

// GET /review/all — public
router.get('/all', getAllReviews);

// DELETE /review/delete/:id — admin only
router.delete('/delete/:id', authMiddleware, deleteReview);

module.exports = router;
