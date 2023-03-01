const express = require('express');

const {
  loginUser,
  signupUser,
  checkToken,
  getUserDetails,
  updateUser,
  checkForUser,
} = require('../controllers/userController');
const router = express.Router();

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// check JWT
router.post('/checktoken', checkToken);

router.get('/checkforuser/:email', checkForUser);

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/:user', getUserDetails);
router.put('/:user', updateUser);

module.exports = router;
