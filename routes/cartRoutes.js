const express = require('express');
const { authenticateUser } = require('../middleware/auth'); 

const router = express.Router();

const {
  addToCart,
  removeCartItem,
  updateCartItem
} = require('../controllers/cartController');


router.post('/add', authenticateUser, addToCart);

router.delete('/item/:itemId', authenticateUser, removeCartItem);

router.put('/item/:itemId', authenticateUser, updateCartItem);

module.exports = router;
