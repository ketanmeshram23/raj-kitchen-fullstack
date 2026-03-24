const Dish = require('../models/Dish');
const Category = require('../models/Category');
const Review = require('../models/Review');

// GET /admin/stats — admin only
const getStats = async (req, res) => {
  try {
    const [totalDishes, activeDishes, totalCategories, totalReviews, ratingAgg] = await Promise.all([
      Dish.countDocuments(),
      Dish.countDocuments({ isActive: true }),
      Category.countDocuments(),
      Review.countDocuments(),
      Review.aggregate([
        { $group: { _id: null, avg: { $avg: '$rating' } } },
      ]),
    ]);

    const averageRating = ratingAgg.length > 0
      ? parseFloat(ratingAgg[0].avg.toFixed(1))
      : 0;

    res.json({
      success: true,
      data: {
        totalDishes,
        activeDishes,
        totalCategories,
        totalReviews,
        averageRating,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
};

module.exports = { getStats };
