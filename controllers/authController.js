const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In production, store admin credentials in DB.
// For simplicity, using env vars with bcrypt comparison.
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    const validUsername = username === process.env.ADMIN_USERNAME;
    const validPassword = password === process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please try again.',
      });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: { username, role: 'admin' },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
};

const verifyToken = (req, res) => {
  // If this route is reached, the auth middleware already validated the token
  res.json({
    success: true,
    message: 'Token is valid.',
    admin: req.admin,
  });
};

module.exports = { adminLogin, verifyToken };
