const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Token generation function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register [New User]
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate JWT token
  const token = generateToken(user._id);

  // Respond with user details and token
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT token
    const token = generateToken(user._id);

    // Respond with user details and token
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
