const mongoose = require('mongoose');

const Cart = require('../models/Cart');

// 1. Add Items to Cart
const addToCart = async (req, res) => {
    try {
      const { userId, items } = req.body;
  
      if (!userId || !items || items.length === 0) {
        return res.status(400).json({ message: "User ID and items are required" });
      }
  
      // Check if the cart exists for the user
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({ userId, items });
      } else {
        // If cart exists, update the items
        items.forEach((newItem) => {
          const existingItem = cart.items.find(
            (item) => item.productId.toString() === newItem.productId
          );
          if (existingItem) {
            existingItem.quantity += newItem.quantity; // Update quantity
          } else {
            cart.items.push(newItem); // Add new item
          }
        });
      }
  
      // Save the cart to the database
      const savedCart = await cart.save();
  
      // Send success response
      return res.status(201).json(savedCart);
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ message: "Failed to add to cart", error });
    }
  };
  
  
//  Update Quantity of an Item in Cart
const updateCartItem = async (req, res) => {
    try {
      const { itemId } = req.params; // Get itemId from route parameter
      const { quantity } = req.body; // Get quantity from request body
  
      if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
      }
  
      const userId = req.user.id; // Get userId from authenticated user
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the specific item by its _id in the items array
      const item = cart.items.id(itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Update the quantity and save the cart
      item.quantity = quantity;
      const updatedCart = await cart.save();
  
      res.status(200).json(updatedCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update cart item', error });
    }
  };
  

//  Remove an Item from Cart
const removeCartItem = async (req, res) => {
    try {
      const { itemId } = req.params; // Get itemId from route parameters
      const userId = req.user.id; // Get authenticated user ID from token
  
      // Find the cart for the user
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Filter out the item to remove it from the items array
      const initialItemsCount = cart.items.length;
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  
      if (cart.items.length === initialItemsCount) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      // Save the updated cart to the database
      const updatedCart = await cart.save();
  
      res.status(200).json({
        message: 'Item removed successfully',
        cart: updatedCart,
      });
    } catch (error) {
      console.error('Error in removeCartItem:', error);
      res.status(500).json({ message: 'Failed to remove cart item', error });
    }
  };
  

module.exports = { addToCart,  updateCartItem, removeCartItem };
