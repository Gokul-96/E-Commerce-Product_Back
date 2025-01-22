const express = require('express');

const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');

const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware,createOrder); // Create a new order
router.get('/', authMiddleware,getUserOrders); // Get users orders 
router.put( '/status', authMiddleware,  updateOrderStatus); // Update status using this

module.exports = router;
