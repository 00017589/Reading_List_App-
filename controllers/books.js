const {
    getAllBooksService,
    getBookByIdService,
    createBookService,
    updateBookService,
    deleteBookService
  } = require('../services/books');
  
  //getting all books after login
  const getAllBooks = async (req, res) => {
    try {
      const { status } = req.query;
      const books = await getAllBooksService(req.user.id, status);
      
      res.render('books/list', {
        title: 'My Reading List',
        books,
        currentStatus: status || 'all'
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to fetch books');
      res.redirect('/');
    }
  };
  
  // get book form
  const getCreateBook = (req, res) => {
    res.render('books/create', { title: 'Add New Book' });
  };
  
  //creating a bok
  const createBook = async (req, res) => {
    try {
      const { title, author, genre, status, notes } = req.body;
      
      if (!title || !author) {
        req.flash('error_msg', 'Title and author are required');
        return res.redirect('/books/new');
      }
      
      await createBookService({
        title,
        author,
        genre,
        status,
        notes,
        user: req.user.id
      });
      
      req.flash('success_msg', 'Book added to your reading list');
      res.redirect('/books');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to add book');
      res.redirect('/books/new');
    }
  };
  
  // wanted book
  const getBook = async (req, res) => {
    try {
      const book = await getBookByIdService(req.params.id, req.user.id);
      
      if (!book) {
        req.flash('error_msg', 'Book not found');
        return res.redirect('/books');
      }
      
      res.render('books/detail', {
        title: book.title,
        book
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to fetch book details');
      res.redirect('/books');
    }
  };
  
  // editing
  const getEditBook = async (req, res) => {
    try {
      const book = await getBookByIdService(req.params.id, req.user.id);
      
      if (!book) {
        req.flash('error_msg', 'Book not found');
        return res.redirect('/books');
      }
      
      res.render('books/edit', {
        title: `Edit ${book.title}`,
        book
      });
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to fetch book for editing');
      res.redirect('/books');
    }
  };
  
  // updating a book
  const updateBook = async (req, res) => {
    try {
      const { title, author, genre, status, notes } = req.body;
      
      if (!title || !author) {
        req.flash('error_msg', 'Title and author are required');
        return res.redirect(`/books/${req.params.id}/edit`);
      }
      
      const book = await updateBookService(req.params.id, req.user.id, {
        title,
        author,
        genre,
        status,
        notes
      });
      
      if (!book) {
        req.flash('error_msg', 'Book not found or you do not have permission');
        return res.redirect('/books');
      }
      
      req.flash('success_msg', 'Book updated successfully');
      res.redirect(`/books/${req.params.id}`);
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to update book');
      res.redirect(`/books/${req.params.id}/edit`);
    }
  };
  
  // deletion
  const deleteBook = async (req, res) => {
    try {
      const result = await deleteBookService(req.params.id, req.user.id);
      
      if (!result) {
        req.flash('error_msg', 'Book not found or you do not have permission');
        return res.redirect('/books');
      }
      
      req.flash('success_msg', 'Book removed from your reading list');
      res.redirect('/books');
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to delete book');
      res.redirect('/books');
    }
  };
  
  module.exports = {
    getAllBooks,
    getCreateBook,
    createBook,
    getBook,
    getEditBook,
    updateBook,
    deleteBook
  };