const express = require('express');
const { getProducts, getProductById ,createProduct} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
// 1. Get all products
router.get('/', getProducts); 
// 2.Get product details by ID
router.get('/:id', getProductById); 

module.exports = router;
