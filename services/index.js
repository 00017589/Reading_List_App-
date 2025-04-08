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
  
  const generateId = () => {
    return Date.now().toString();
  };
  
  exports.getAllBooks = () => {
    return books;
  };
  
  exports.getBookById = (id) => {
    return books.find(book => book.id === id);
  };
  
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
  
  exports.deleteBook = (id) => {
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);
    
    return books.length < initialLength;
  };
  
  exports.filterBooksByStatus = (status) => {
    if (status === 'all') {
      return books;
    }
    
    return books.filter(book => book.status === status);
  };