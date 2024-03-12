// controllers/categoryController.js
const { Category, Product } = require('../models');

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.render('categoryList', { categories, body: "Categories" })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id).populate('products');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.locals.category = category; // Store category in res.locals
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function renderCategoryProducts(req, res) {
  try {
    const categoryId = req.params.id;
    console.log("Category ID:", categoryId); // Log the category ID

    const category = res.locals.category;
    console.log("Category:", category); // Log the category object

    const products = await Product.find({ category: categoryId });
    console.log("Products:", products); // Log the products associated with the category

    if (!category || !products || products.length === 0) {
      return res.status(404).json({ message: 'Category or products not found' });
    }

    res.render('categoryProducts', { category, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}






async function getProductsByCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const products = await Product.find({ category: categoryId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    const category = res.locals.category;

    res.render('categoryProducts', { category, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



async function updateCategory(req, res) {
  try {
    if (req.body.name != null) {
      res.category.name = req.body.name;
    }
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteCategory(req, res) {
  try {
    await res.category.remove();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  renderCategoryProducts,
  getProductsByCategory,
  updateCategory,
  deleteCategory
};
