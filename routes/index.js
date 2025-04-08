const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/index');

// Home page
router.get('/', getHomePage);

module.exports = router;