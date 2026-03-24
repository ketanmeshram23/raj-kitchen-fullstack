const Review = require('../models/Review');

// POST /review/add — public
const addReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
    }
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const review = await Review.create({
      name: name.trim(),
      rating: parseInt(rating),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review!',
      data: review,
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit review.' });
  }
};

// GET /review/all — public
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

// DELETE /review/delete/:id — admin only
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    res.json({ success: true, message: `Review by "${review.name}" deleted.` });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete review.' });
  }
};

module.exports = { addReview, getAllReviews, deleteReview };
