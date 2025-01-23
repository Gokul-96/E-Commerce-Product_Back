const express = require('express');
const { getProducts, getProductById ,createProduct} = require('../controllers/productController');

const router = express.Router();

// create new product 
router.post('/', createProduct);
// Get all products
router.get('/', getProducts); 
// Get product details by ID
router.get('/:id', getProductById); 

module.exports = router;
