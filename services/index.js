// In-memory database for books
// In a real application, you would use a proper database like MongoDB or SQL
let books = [
    {
      id: '1',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      status: 'Completed',
      notes: 'A classic novel about racial injustice in the American South.',
      dateAdded: new Date('2023-01-15').toISOString()
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      status: 'Reading',
      notes: 'A dystopian social science fiction novel.',
      dateAdded: new Date('2023-02-20').toISOString()
    },
    {
      id: '3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      status: 'To Read',
      notes: 'A novel about the American Dream in the 1920s.',
      dateAdded: new Date('2023-03-10').toISOString()
    }
  ];
  
  // Helper function to generate ID
  const generateId = () => {
    return Date.now().toString();
  };
  
  // Get all books
  exports.getAllBooks = () => {
    return books;
  };
  
  // Get a book by ID
  exports.getBookById = (id) => {
    return books.find(book => book.id === id);
  };
  
  // Add a new book
  exports.addBook = (title, author, genre, status, notes) => {
    const newBook = {
      id: generateId(),
      title,
      author,
      genre,
      status,
      notes: notes || '',
      dateAdded: new Date().toISOString()
    };
    
    books.push(newBook);
    return newBook;
  };
  
  // Update a book
  exports.updateBook = (id, title, author, genre, status, notes) => {
    const index = books.findIndex(book => book.id === id);
    
    if (index === -1) {
      return false;
    }
    
    books[index] = {
      ...books[index],
      title,
      author,
      genre,
      status,
      notes: notes || ''
    };
    
    return true;
  };
  
  // Delete a book
  exports.deleteBook = (id) => {
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);
    
    return books.length < initialLength;
  };
  
  // Filter books by status
  exports.filterBooksByStatus = (status) => {
    if (status === 'all') {
      return books;
    }
    
    return books.filter(book => book.status === status);
  };