const express = require('express');

const {
  loginUser,
  signupUser,
  checkToken,
} = require('../controllers/userController');
const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// check JWT
router.post('/checktoken', checkToken);

module.exports = router;
