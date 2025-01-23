const express = require('express');

const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');

const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
console.log(createOrder, getUserOrders, updateOrderStatus); 

router.post('/create', authMiddleware,createOrder); // Create a new order

console.log('createOrder:', createOrder);
router.get('/', authMiddleware,getUserOrders); // Get users orders 
console.log('getUserOrders:', getUserOrders);
router.put( '/status', authMiddleware,  updateOrderStatus); // Update status using this

console.log('getUserOrders:', getUserOrders);
console.log('updateOrderStatus:', updateOrderStatus);
module.exports = router;
