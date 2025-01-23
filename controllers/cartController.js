const Cart = require('../models/Cart');
const Product = require('../models/Cart');

// 1. Add a product to the cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body; // Extract product and quantity from request body
  const userId = req.user._id; // Assuming `req.user` contains authenticated user details

  try {
    const product = await Product.findById(productId); // Ensure the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });

    // If the cart does not exist create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if the product is already in the cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        // Update the quantity if the product exists
        existingItem.quantity += quantity;
      } else {
        // Add the product to the cart if it doesn't exist
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save(); 
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart', error });
  }
};

// 2. Remove a product from the cart

const removeFromCart = async (req, res) => {
  const { productId } = req.body; 
  const userId = req.user._id; // Assuming `req.user` contains authenticated user details

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product to be removed
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save(); 
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product from cart', error });
  }
};

// 3. Update the quantity of a product in the cart


const updateCart = async (req, res) => {
  const { productId, quantity } = req.body; 
  const userId = req.user._id; // Assuming `req.user` contains authenticated user details

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const item = cart.items.find(item => item.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    item.quantity = quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCart,
};
