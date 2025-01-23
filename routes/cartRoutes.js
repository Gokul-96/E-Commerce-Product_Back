const express = require('express');
const { authenticateUser } = require('../middleware/auth'); 

const router = express.Router();

const {
  addToCart,
  removeFromCart,
  updateCart,
} = require('../controllers/cartController');


router.post('/add', authenticateUser, addToCart);

router.delete('/remove', authenticateUser, removeFromCart);

router.put('/update', authenticateUser, updateCart);

module.exports = router;
