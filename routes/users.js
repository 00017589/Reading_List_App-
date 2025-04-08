const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  getLogin, 
  getRegister, 
  registerUser, 
  logoutUser 
} = require('../controllers/users');

// Login page
router.get('/login', getLogin);

// Register page
router.get('/register', getRegister);

// Register a user
router.post('/register', registerUser);

// Login a user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/users/login',
  failureFlash: true
}));

// Logout
router.get('/logout', logoutUser);

module.exports = router;