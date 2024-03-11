// controllers/categoryController.js
const { Category } = require('../models');

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
    res.render('categoryList', { categories, body: {} })
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
    const category = res.locals.category; // Retrieve category from res.locals
    res.render('categoryProducts', { category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getProductsByCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id).populate('products');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.render('categoryProducts', { category });
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
