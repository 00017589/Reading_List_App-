const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bookController = require('../controllers/index');

// Book validation rules
const bookValidationRules = [
  check('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  check('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author must be less than 100 characters'),
  check('genre').trim().notEmpty().withMessage('Genre is required'),
  check('status').isIn(['To Read', 'Reading', 'Completed']).withMessage('Status must be "To Read", "Reading", or "Completed"')
];

// Home page - Display all books
router.get('/', bookController.getAllBooks);

// Add new book - Form
router.get('/books/add', (req, res) => {
  res.render('add-book', { title: 'Add New Book' });
});

// Add new book - Submit
router.post('/books/add', bookValidationRules, bookController.addBook);

// View book details
router.get('/books/:id', bookController.getBookById);

// Edit book - Form
router.get('/books/edit/:id', bookController.getEditBookForm);

// Edit book - Submit
router.post('/books/edit/:id', bookValidationRules, bookController.updateBook);

// Delete book
router.post('/books/delete/:id', bookController.deleteBook);

// Filter books by status
router.get('/filter/:status', bookController.filterBooksByStatus);

module.exports = router;