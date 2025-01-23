const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    const { title, image , price} = req.body; // Extract product data from the request body
  
    try {
      const newProduct = new Product({
        title,
        image,
        price
        
      });
  
      const savedProduct = await newProduct.save(); // Save the product to the database
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    }
  };
  
// Get all products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({ message: 'failed to fetch products', error });
  }
};

// Get a  product by using ID


const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'failed to fetch product', error });
    }
  };
  
  module.exports = {
    createProduct,
    getProducts,
    getProductById,
  };
