const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bookController = require('../controllers/index');

const bookValidationRules = [
  check('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  check('author').trim().notEmpty().withMessage('Author is required').isLength({ max: 100 }).withMessage('Author must be less than 100 characters'),
  check('genre').trim().notEmpty().withMessage('Genre is required'),
  check('status').isIn(['To Read', 'Reading', 'Completed']).withMessage('Status must be "To Read", "Reading", or "Completed"')
];

router.get('/', bookController.getAllBooks);

router.get('/books/add', (req, res) => {
  res.render('add-book', { title: 'Add New Book' });
});

router.post('/books/add', bookValidationRules, bookController.addBook);
router.get('/books/:id', bookController.getBookById);
router.get('/books/edit/:id', bookController.getEditBookForm);
router.post('/books/edit/:id', bookValidationRules, bookController.updateBook);
router.post('/books/delete/:id', bookController.deleteBook);
router.get('/filter/:status', bookController.filterBooksByStatus);
module.exports = router;