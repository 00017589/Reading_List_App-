require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    startApp();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

function startApp() {
  // Routes
  const userRoutes = require('./routes/users');
  const booksRoutes = require('./routes/index');

  // View engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  // Middleware
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({
    secret: 'reading-list-secret',
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.session.user || null;
    next();
  });

  // Mount routes
  app.use('/users', userRoutes);
  app.use('/', booksRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
      title: 'Error',
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use.`);
    } else {
      throw err;
    }
  });
}

module.exports = app;
