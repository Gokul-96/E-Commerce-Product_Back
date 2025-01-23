const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

// 1. Create an order
router.post('/', authenticateUser, createOrder);

// 2. Get all orders for the authenticated user
router.get('/', authenticateUser, getUserOrders);

// 3. Update order status (Admin only)
router.put('/status', authenticateUser, updateOrderStatus);

module.exports = router;

