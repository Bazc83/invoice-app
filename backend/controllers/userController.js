const User = require('../models/userModel');

// Login user
const loginUser = async (req, res) => {
  res.json({ message: 'login user' });
};

// Signup user
const signupUser = async (req, res) => {
  res.json({ message: 'signup user' });
};

module.exports = { loginUser, signupUser };
