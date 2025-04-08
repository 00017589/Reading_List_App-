const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['to read', 'reading', 'completed'],
    default: 'to read'
  },
  notes: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;