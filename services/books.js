const Book = require('../models/book');

const getAllBooksService = async (userId, status) => {
  try {
    const query = { user: userId };
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    return await Book.find(query).sort({ createdAt: -1 });
  } catch (err) {
    console.error('Error in getAllBooksService:', err);
    throw err;
  }
};

// find book by ID
const getBookByIdService = async (bookId, userId) => {
  try {
    return await Book.findOne({ _id: bookId, user: userId });
  } catch (err) {
    console.error('Error in getBookByIdService:', err);
    throw err;
  }
};

// new book creation
const createBookService = async (bookData) => {
  try {
    const book = new Book(bookData);
    return await book.save();
  } catch (err) {
    console.error('Error in createBookService:', err);
    throw err;
  }
};

// updating
const updateBookService = async (bookId, userId, bookData) => {
  try {
    return await Book.findOneAndUpdate(
      { _id: bookId, user: userId },
      bookData,
      { new: true }
    );
  } catch (err) {
    console.error('Error in updateBookService:', err);
    throw err;
  }
};

// deletion
const deleteBookService = async (bookId, userId) => {
  try {
    const result = await Book.findOneAndDelete({ _id: bookId, user: userId });
    return !!result;
  } catch (err) {
    console.error('Error in deleteBookService:', err);
    throw err;
  }
};

module.exports = {
  getAllBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService
};