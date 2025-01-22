const Order = require('../models/Order');

// Create new order

const createOrder = async (req, res) => {
  try {
    const { orderItems, priceTotally } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'no ordered  items found' });
    }

    const order = new Order({
      user: req.user.id, 
      orderItems,
      priceTotally,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'failed to create order', error });
  }
};

// Get all orders for user


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('orderItems.product', 'title price image');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'failed to retrieve orders', error });
  }
};

// Update order status

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'failed to update order', error });
  }
};


module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
};


