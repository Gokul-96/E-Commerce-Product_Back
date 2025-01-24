const Order = require('../models/Order'); // Import the Order model

// 1. Create an Order
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, priceTotally, status } = req.body;

    // Validate request body
    if (!user || !orderItems || !priceTotally) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new order
    const order = new Order({
      user,
      orderItems,
      priceTotally,
      status: status || 'Pending', // Default status
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// 2. Get All Orders for the Authenticated User
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `authenticateUser` adds `user` to `req`
    const orders = await Order.find({ user: userId }).populate('orderItems.product');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// 3. Update Order Status (Admin Only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: 'Order ID and status are required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};

module.exports = { createOrder, getUserOrders, updateOrderStatus };
