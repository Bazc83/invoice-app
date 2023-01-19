const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  // Nothing senstive in the {} payload of sign()

  // jwt.sign({payload}, secret, {options})
  // 3d === 3 days
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Create jwt token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // Create jwt token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
