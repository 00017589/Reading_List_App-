const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bookController = require('../controllers/index');
const userController = require('../controllers/users/index'); 

// Validation rules
const bookValidationRules = [
  check('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  check('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author must be less than 100 characters'),
  check('genre').trim().notEmpty().withMessage('Genre is required'),
  check('status').isIn(['To Read', 'Reading', 'Completed']).withMessage('Status must be "To Read", "Reading", or "Completed"')
];

router.get('/', userController.isAuthenticated, bookController.getAllBooks);
router.get('/books/add', userController.isAuthenticated, (req, res) => {
  res.render('add-book', { title: 'Add New Book' });
});

router.post('/books/add', userController.isAuthenticated, bookValidationRules, bookController.addBook);
router.get('/books/:id', userController.isAuthenticated, bookController.getBookById);
router.get('/books/edit/:id', userController.isAuthenticated, bookController.getEditBookForm);
router.post('/books/edit/:id', userController.isAuthenticated, bookValidationRules, bookController.updateBook);
router.post('/books/delete/:id', userController.isAuthenticated, bookController.deleteBook);
router.get('/filter/:status', userController.isAuthenticated, bookController.filterBooksByStatus);

module.exports = router;
