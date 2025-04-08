const { registerUserService } = require('../services/users');

// login page
const getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/books');
  }
  res.render('users/login', { title: 'Login' });
};

// register page
const getRegister = (req, res) => {
  if (req.user) {
    return res.redirect('/books');
  }
  res.render('users/register', { title: 'Register' });
};

// new user coming
const registerUser = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // checking fields 
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // confirming password
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // pasword length validation
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('users/register', {
      title: 'Register',
      errors,
      name,
      email
    });
  }

  try {
    const result = await registerUserService(name, email, password);
    
    if (result.error) {
      errors.push({ msg: result.error });
      return res.render('users/register', {
        title: 'Register',
        errors,
        name,
        email
      });
    }
    
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    errors.push({ msg: 'An error occurred during registration' });
    res.render('users/register', {
      title: 'Register',
      errors,
      name,
      email
    });
  }
};

// logout 
const logoutUser = (req, res) => {
  req.logout(function(err) {
    if (err) { 
      console.error(err);
      return next(err); 
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
};

module.exports = {
  getLogin,
  getRegister,
  registerUser,
  logoutUser
};