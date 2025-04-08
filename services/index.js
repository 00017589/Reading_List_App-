// database for books
// bookk
let books = [
    {
      id: '1',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      status: 'Completed',
      notes: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
      dateAdded: new Date('2025-03-28').toISOString()
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      status: 'Reading',
      notes: 'A masterpiece of rebellion and imprisonment where war is peace freedom is slavery and Big Brother is watching.',
      dateAdded: new Date('2025-03-28').toISOString()
    },
    {
      id: '3',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      status: 'To Read',
      notes: 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.',
      dateAdded: new Date('2025-03-29').toISOString()
    }
  ];
  
  //generating ID with helper function
  const generateId = () => {
    return Date.now().toString();
  };
  
  // getting all books
  exports.getAllBooks = () => {
    return books;
  };
  
  // get a book using ID
  exports.getBookById = (id) => {
    return books.find(book => book.id === id);
  };
  
  // adding a new book
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
  
  // updating a book
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
  
  // deleting a book
  exports.deleteBook = (id) => {
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);
    
    return books.length < initialLength;
  };
  
  // filtering a book by status
  exports.filterBooksByStatus = (status) => {
    if (status === 'all') {
      return books;
    }
    
    return books.filter(book => book.status === status);
  };