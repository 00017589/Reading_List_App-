const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/index');

router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.get('/forgot-password', userController.getForgotPassword);         
router.get('/reset-password/:token', userController.getResetPassword);      

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/profile', userController.isAuthenticated, userController.getProfile);
router.put('/profile', userController.isAuthenticated, userController.updateProfile);

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
