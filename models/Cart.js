const mongoose = require('mongoose');

// Define schema for the Cart
const cartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the User model
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
        quantity: { type: Number, required: true, default: 1 }, // Quantity of the product
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Cart', cartSchema);
