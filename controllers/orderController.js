const Order = require('../models/Order');

// 1. Create a new order
const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// 2. View all orders for the authenticated user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.productId', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// 3. Update the order status (Admin Only)
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};

module.exports = { createOrder, getUserOrders, updateOrderStatus };
