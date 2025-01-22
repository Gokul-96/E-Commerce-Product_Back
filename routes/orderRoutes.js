const express = require('express');

const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');



const router = express.Router();

router.post('/', createOrder); // Create a new order
router.get('/', getUserOrders); // Get users orders 
router.put( '/status',  updateOrderStatus); // Update status using this

module.exports = router;
