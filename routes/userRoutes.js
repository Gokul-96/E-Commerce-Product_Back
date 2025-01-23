const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const {authMiddleware} = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser); 



router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
module.exports = router;
