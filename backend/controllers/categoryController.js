const Category = require('../models/Category');
const Dish = require('../models/Dish');

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ priority: 1, order: 1, createdAt: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories.' });
  }
};

// POST create category
const createCategory = async (req, res) => {
  try {
    const { name, name_mr, order, priority } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'A category with this name already exists.' });
    }

    const category = await Category.create({
      name: name.trim(),
      name_mr: name_mr ? name_mr.trim() : '',
      order: order || 0,
      priority: priority !== undefined ? parseInt(priority) : 999,
    });
    res.status(201).json({ success: true, message: 'Category created successfully.', data: category });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ success: false, message: 'Failed to create category.' });
  }
};

// PUT update/rename category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_mr, order, priority } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const duplicate = await Category.findOne({ name: name.trim(), _id: { $ne: id } });
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'Another category with this name already exists.' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    category.name = name.trim();
    if (name_mr !== undefined) category.name_mr = name_mr.trim();
    if (order !== undefined) category.order = order;
    if (priority !== undefined) category.priority = parseInt(priority);

    await category.save();

    res.json({ success: true, message: 'Category updated successfully.', data: category });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ success: false, message: 'Failed to update category.' });
  }
};

// DELETE category (also deletes all dishes in it)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    // Delete all dishes in this category
    const dishesDeleted = await Dish.deleteMany({ category_id: id });

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: `Category "${category.name}" and its ${dishesDeleted.deletedCount} dish(es) deleted.`,
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category.' });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
