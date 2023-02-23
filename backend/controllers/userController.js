const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const createToken = (_id, res) => {
  // Nothing senstive in the {} payload of sign()

  // jwt.sign({payload}, secret, {options})
  // 3d === 3 days
  return jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, { expiresIn: '90d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Create jwt token
    const token = createToken(user._id, res);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
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

// Check token
const checkToken = async (req, res) => {
  const { token } = req.body;

  const jwtPayload = jwt.decode(token, process.env.TOKEN_SECRET);
  const currentTime = Date.now() / 1000;
  const expiryTime = jwtPayload.exp;

  if (currentTime >= expiryTime) {
    return res.status(200).json({ jwtValid: false });
  } else {
    return res.status(200).json({ jwtValid: true });
  }
};

const getUserDetails = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const userDetails = await User.findOne(
    { _id: req.user._id.toHexString() },
    {
      // excludes password field
      password: 0,
    }
  );

  res.send(userDetails);
});

module.exports = { loginUser, signupUser, checkToken, getUserDetails };
