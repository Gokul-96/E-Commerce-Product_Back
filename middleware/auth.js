// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const authMiddleware = (req, res, next) => {
//     console.log('authMiddleware called');
//   let token;

//   // Check if token is in the Authorization header
//   if (
//     req.headers.authorization && 
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // Extract token
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request object
//       req.user = decoded;

//       next(); // Allow request to proceed
//     } catch (error) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   // If no token is found in the Authorization header
//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports ={ authMiddleware};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = await User.findById(decoded.id).select('-password'); // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateUser };


