const express = require('express');
const router = express.Router();
//validation setup
const { check, validationResult } = require('express-validator');
const bookController = require('../controllers/index');

// Book validation rules
const bookValidationRules = [
  check('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  check('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author must be less than 100 characters'),
  check('genre').trim().notEmpty().withMessage('Genre is required'),
  check('status').isIn(['To Read', 'Reading', 'Completed']).withMessage('Status must be "To Read", "Reading", or "Completed"')
];

// Home page - show whole list of books
router.get('/', bookController.getAllBooks);

// adding new book form
router.get('/books/add', (req, res) => {
  res.render('add-book', { title: 'Add New Book' });
});

// Submit new book form
router.post('/books/add', bookValidationRules, bookController.addBook);

// book details
router.get('/books/:id', bookController.getBookById);

// editting book form
router.get('/books/edit/:id', bookController.getEditBookForm);

// submitting edit form
router.post('/books/edit/:id', bookValidationRules, bookController.updateBook);

// deletting book
router.post('/books/delete/:id', bookController.deleteBook);

// filltering books by status (to read, completed, reading..)
router.get('/filter/:status', bookController.filterBooksByStatus);

module.exports = router;