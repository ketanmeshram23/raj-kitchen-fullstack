const express = require('express');
const router = express.Router();
const { getMenu, getMenuAdmin, addDish, updateDish, deleteDish } = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');

// GET /menu — public: menu grouped by category
router.get('/', getMenu);

// GET /menu/all — admin: full menu including inactive
router.get('/all', authMiddleware, getMenuAdmin);

// POST /menu/add — admin only
router.post('/add', authMiddleware, addDish);

// PUT /menu/update/:id — admin only
router.put('/update/:id', authMiddleware, updateDish);

// DELETE /menu/delete/:id — admin only
router.delete('/delete/:id', authMiddleware, deleteDish);

module.exports = router;
