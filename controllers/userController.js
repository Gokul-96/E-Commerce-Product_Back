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
  console.log('Hashed Password:', hashedPassword); // Debugging: Check the hashed password

  // Create new user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  
  console.log('New User Created:', user); // Debugging: Check the user object

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Login attempt with email:", email);
  
    // Trim password to remove extra spaces
    const trimmedPassword = password.trim();
    console.log("Trimmed Entered Password:", trimmedPassword);
  
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with that email");
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    console.log('Stored Hashed Password:', user.password); // Log the stored hashed password
  
    // Manual password comparison (for debugging purposes)
    // const bcrypt = require('bcryptjs');
    const storedHashedPassword = '$2a$10$sF8KBKG5o/ZZLGiAj./4fO4zYEz/xvD0oXI0WUydzdDoIhyrlOEQe';
    const enteredPassword = 'cytrusst2025111';
    
    bcrypt.compare(enteredPassword, storedHashedPassword)
      .then(isMatch => {
        console.log('Password match:', isMatch); // Should print true if it matches
      })
      .catch(err => {
        console.error('Error comparing passwords:', err);
      });
  
    // Compare the entered password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(trimmedPassword, user.password);
    console.log('Entered Password:', trimmedPassword);
    console.log('Password Comparison Result:', isPasswordCorrect);
  
    if (!isPasswordCorrect) {
      console.log("Incorrect password");
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  
    // Generate JWT token
    const token = generateToken(user._id);
  
    // Respond with user details and token
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  });

module.exports = {
  registerUser,
  loginUser,
};
