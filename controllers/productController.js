// controllers/productController.js
const { Product, Category } = require('../models');


async function renderAddProductForm(req, res) {
  try {
    const categories = await Category.find(); 
    res.render('addProductForm', { title: 'Add Product', categories, body: {} });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('category');
    console.log(JSON.stringify(products, null, 2));
    res.render('productList', { products, body: {} });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.render('productDetails',  { product, body: {} } );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



async function updateProduct(req, res) {
  try {
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.description != null) {
      res.product.description = req.body.description;
    }
    // Update other fields as needed
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  renderAddProductForm,
};