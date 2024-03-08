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
     // Redirect to the details page of the newly created product
     res.redirect(`/products/${product._id}`);
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
    const productId = req.params.id;
    const { name, description, price, quantity, category } = req.body;

    // Find the product by ID and update its details
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      description,
      price,
      quantity,
      category
    }, { new: true });

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Redirect to the updated product details page
    res.redirect(`/products/${updatedProduct._id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


async function renderEditProductForm(req, res) {
  try {
    // Retrieve the product details based on the provided product ID
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Retrieve categories for dropdown menu
    const categories = await Category.find();

    // Render the edit product form view
    res.render('editProductForm', { title: 'Edit Product', product, categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

  // Redirect to the product list page
  res.redirect('/products');
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
  renderEditProductForm
};
