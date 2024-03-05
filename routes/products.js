const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Middleware function to get a single product by ID
async function getProduct(req, res, next) {
  let product;
  try {
      product = await Product.findById(req.params.id);
      if (product == null) {
          return res.status(404).json({ message: 'Product not found' });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products - Render products.ejs view
router.get('/', async (req, res) => {
  try {
      const products = await Product.find();
      res.render('products', { products });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Get a single product - Render product-details.ejs view
router.get('/:id', getProduct, (req, res) => {
  res.render('productDetails', { product: res.product });
});

// Update a product
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  // Update other fields as needed
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
