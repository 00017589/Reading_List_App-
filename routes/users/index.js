const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/index');

// authenticating user routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// routes of user profiles
router.get('/profile', userController.isAuthenticated, userController.getProfile);
router.put('/profile', userController.isAuthenticated, userController.updateProfile);

// password setup
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;