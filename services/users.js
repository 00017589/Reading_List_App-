const User = require('../models/user');

// registration
const registerUserService = async (name, email, password) => {
  try {
    // checking if email is used before
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return { error: 'Email is already registered' };
    }
    
    // new user
    const user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    return { success: true };
  } catch (err) {
    console.error('Error in registerUserService:', err);
    throw err;
  }
};

module.exports = {
  registerUserService
};