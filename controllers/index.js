const { validationResult } = require('express-validator');
const bookService = require('../services/index');

exports.getAllBooks = (req, res) => {
  try {
    const books = bookService.getAllBooks();
    res.render('index', { 
      title: 'My Reading List',
      books: books
    });
  } catch (error) {
    req.flash('error_msg', 'Error fetching books');
    res.redirect('/');
  }
};

exports.getBookById = (req, res) => {
  try {
    const id = req.params.id;
    const book = bookService.getBookById(id);
    
    if (!book) {
      req.flash('error_msg', 'Book not found');
      return res.redirect('/');
    }
    
    res.render('book-details', {
      title: book.title,
      book: book
    });
  } catch (error) {
    req.flash('error_msg', 'Error fetching book');
    res.redirect('/');
  }
};

exports.addBook = (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('add-book', {
      title: 'Add New Book',
      errors: errors.array(),
      book: req.body
    });
  }
  
  try {
    const { title, author, genre, status, notes } = req.body;
    bookService.addBook(title, author, genre, status, notes);
    
    req.flash('success_msg', 'Book added successfully');
    res.redirect('/');
  } catch (error) {
    req.flash('error_msg', 'Error adding book');
    res.redirect('/books/add');
  }
};

exports.getEditBookForm = (req, res) => {
  try {
    const id = req.params.id;
    const book = bookService.getBookById(id);
    
    if (!book) {
      req.flash('error_msg', 'Book not found');
      return res.redirect('/');
    }
    
    res.render('edit-book', {
      title: 'Edit Book',
      book: book
    });
  } catch (error) {
    req.flash('error_msg', 'Error fetching book');
    res.redirect('/');
  }
};

exports.updateBook = (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('edit-book', {
      title: 'Edit Book',
      errors: errors.array(),
      book: { ...req.body, id }
    });
  }
  
  try {
    const { title, author, genre, status, notes } = req.body;
    
    const success = bookService.updateBook(id, title, author, genre, status, notes);
    
    if (!success) {
      req.flash('error_msg', 'Book not found');
      return res.redirect('/');
    }
    
    req.flash('success_msg', 'Book updated successfully');
    res.redirect('/');
  } catch (error) {
    req.flash('error_msg', 'Error updating book');
    res.redirect(`/books/edit/${id}`);
  }
};

exports.deleteBook = (req, res) => {
  try {
    const id = req.params.id;
    const success = bookService.deleteBook(id);
    
    if (!success) {
      req.flash('error_msg', 'Book not found');
      return res.redirect('/');
    }
    
    req.flash('success_msg', 'Book deleted successfully');
    res.redirect('/');
  } catch (error) {
    req.flash('error_msg', 'Error deleting book');
    res.redirect('/');
  }
};

exports.filterBooksByStatus = (req, res) => {
  try {
    const status = req.params.status;
    const books = bookService.filterBooksByStatus(status);
    
    res.render('index', {
      title: `${status} Books`,
      books: books,
      currentFilter: status
    });
  } catch (error) {
    req.flash('error_msg', 'Error filtering books');
    res.redirect('/');
  }
};