const Dish = require('../models/Dish');
const Category = require('../models/Category');

// GET /menu — public endpoint, returns menu grouped by category
const getMenu = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    const dishes = await Dish.find({ isActive: true })
      .populate('category_id', 'name')
      .sort({ order: 1, createdAt: 1 });

    // Build response grouped by category (mirrors existing MENU_DATA structure)
    const menu = categories.map((cat) => {
      const catDishes = dishes
        .filter((d) => d.category_id && d.category_id._id.toString() === cat._id.toString())
        .map((d) => ({
          _id: d._id,
          name: d.name,
          name_mr: d.name_mr,
          price: d.price,
          priceDisplay: `₹ ${d.price}`,
          description: d.description,
          image: d.image,
          suggestions: d.suggestions,
          category: cat.name,
        }));

      return {
        _id: cat._id,
        category: cat.name,
        category_name_mr: cat.name_mr || '',
        priority: cat.priority !== undefined ? cat.priority : 999,
        dishes: catDishes,
      };
    });

    // Filter out empty categories from public view (optional — remove filter to show empty too)
    const menuWithItems = menu.filter((section) => section.dishes.length > 0);

    res.json({ success: true, data: menuWithItems });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu.' });
  }
};

// GET /menu/all — admin endpoint, includes inactive dishes
const getMenuAdmin = async (req, res) => {
  try {
  const categories = await Category.find().sort({ priority: 1 });
    const dishes = await Dish.find()
      .populate('category_id', 'name')
      .sort({ order: 1, createdAt: 1 });

    const menu = categories.map((cat) => {
      const catDishes = dishes
        .filter((d) => d.category_id && d.category_id._id.toString() === cat._id.toString())
        .map((d) => ({
          _id: d._id,
          name: d.name,
          name_mr: d.name_mr,
          price: d.price,
          priceDisplay: `₹ ${d.price}`,
          description: d.description,
          image: d.image,
          suggestions: d.suggestions,
          isActive: d.isActive,
          category: cat.name,
          category_id: cat._id,
        }));

      return {
        _id: cat._id,
        category: cat.name,
        category_name_mr: cat.name_mr || '',
        priority: cat.priority !== undefined ? cat.priority : 999,
        dishes: catDishes,
      };
    });

    res.json({ success: true, data: menu });
  } catch (error) {
    console.error('Get admin menu error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch menu.' });
  }
};

// POST /menu/add — admin only
const addDish = async (req, res) => {
  try {
    const { name, name_mr, price, category_id, description, image, suggestions } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Dish name is required.' });
    }
    if (!price || isNaN(price) || price < 0) {
      return res.status(400).json({ success: false, message: 'Valid price is required.' });
    }
    if (!category_id) {
      return res.status(400).json({ success: false, message: 'Category is required.' });
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    const dish = await Dish.create({
      name: name.trim(),
      name_mr: name_mr ? name_mr.trim() : '',
      price: parseFloat(price),
      category_id,
      description: description ? description.trim() : '',
      image: image ? image.trim() : '',
      suggestions: suggestions || { 20: '3 Kg', 40: '5 kg', 50: '6 kg' },
    });

    const populated = await Dish.findById(dish._id).populate('category_id', 'name');

    res.status(201).json({
      success: true,
      message: `Dish "${dish.name}" added successfully.`,
      data: populated,
    });
  } catch (error) {
    console.error('Add dish error:', error);
    res.status(500).json({ success: false, message: 'Failed to add dish.' });
  }
};

// PUT /menu/update/:id — admin only
const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_mr, price, category_id, description, image, suggestions, isActive } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (name_mr !== undefined) updateData.name_mr = name_mr.trim();
    if (price !== undefined) {
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ success: false, message: 'Valid price is required.' });
      }
      updateData.price = parseFloat(price);
    }
    if (category_id !== undefined) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found.' });
      }
      updateData.category_id = category_id;
    }
    if (description !== undefined) updateData.description = description.trim();
    if (image !== undefined) updateData.image = image.trim();
    if (suggestions !== undefined) updateData.suggestions = suggestions;
    if (isActive !== undefined) updateData.isActive = isActive;

    const dish = await Dish.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('category_id', 'name');

    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found.' });
    }

    res.json({ success: true, message: `Dish "${dish.name}" updated successfully.`, data: dish });
  } catch (error) {
    console.error('Update dish error:', error);
    res.status(500).json({ success: false, message: 'Failed to update dish.' });
  }
};

// DELETE /menu/delete/:id — admin only
const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found.' });
    }

    res.json({ success: true, message: `Dish "${dish.name}" deleted successfully.` });
  } catch (error) {
    console.error('Delete dish error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete dish.' });
  }
};

module.exports = { getMenu, getMenuAdmin, addDish, updateDish, deleteDish };
