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
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


  
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

const nodemailer = require('nodemailer');

exports.requestPasswordReset = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('No account with that email address exists');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; 
  await user.save();

  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
;

  const resetUrl = `http://localhost:3000/users/reset-password/${resetToken}`;

  const mailOptions = {
    from: '"Reading List App" <your-email@gmail.com>',
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <p>Hello ${user.username || user.email},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);

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