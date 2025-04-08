const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/passport');
const { 
  getAllBooks, 
  getCreateBook, 
  createBook,
  getBook,
  getEditBook,
  updateBook,
  deleteBook 
} = require('../controllers/books');

// getting all book after login
router.get('/', ensureAuthenticated, getAllBooks);

// gettk a book form
router.get('/new', ensureAuthenticated, getCreateBook);

// creating a book
router.post('/', ensureAuthenticated, createBook);

// getting wanted book
router.get('/:id', ensureAuthenticated, getBook);

// getting edit form
router.get('/:id/edit', ensureAuthenticated, getEditBook);

// changing book
router.put('/:id', ensureAuthenticated, updateBook);

// deleting
router.delete('/:id', ensureAuthenticated, deleteBook);

module.exports = router;