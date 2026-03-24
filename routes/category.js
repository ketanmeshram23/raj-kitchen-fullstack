const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');

// GET /category — public: list all categories
router.get('/', getCategories);

// POST /category/add — admin only
router.post('/add', authMiddleware, createCategory);

// PUT /category/update/:id — admin only
router.put('/update/:id', authMiddleware, updateCategory);

// DELETE /category/delete/:id — admin only (also deletes dishes in category)
router.delete('/delete/:id', authMiddleware, deleteCategory);

module.exports = router;
