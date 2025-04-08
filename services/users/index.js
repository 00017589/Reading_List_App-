const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require("c:/Users/Asus/Desktop/17589/models/user");

// creating new user
exports.createUser = async (username, email, password) => {
  // checking if user exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email is already registered');
  }
  
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // creating user in database
  const user = new User({
    username,
    email,
    password: hashedPassword
  });
  
  await user.save();
  
  return user;
};

// authenticating user
exports.authenticateUser = async (email, password) => {
  // getting user by email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // validating password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  return {
    id: user._id,
    username: user.username,
    email: user.email
  };
};

// getting user by ID
exports.getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// getting user by email (helper function)
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// updating user
exports.updateUser = async (id, userData) => {
  const updatedUser = await User.findByIdAndUpdate(
    id, 
    userData, 
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!updatedUser) {
    throw new Error('User not found');
  }
  
  return updatedUser;
};

// requesting password reset
exports.requestPasswordReset = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('No account with that email address exists');
  }
  
  // generating token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // setting token and expiration in database
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  
  return resetToken;
};

exports.resetPassword = async (token, password) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  
  if (!user) {
    throw new Error('Password reset token is invalid or has expired');
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  
  return true;
};