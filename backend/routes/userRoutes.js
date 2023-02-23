const express = require('express');

const {
  loginUser,
  signupUser,
  checkToken,
  getUserDetails,
} = require('../controllers/userController');
const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// check JWT
router.post('/checktoken', checkToken);

const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);

router.get('/:user', getUserDetails);

module.exports = router;
