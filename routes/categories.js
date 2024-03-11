// routes/categories.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const Category = require('../models/category');


router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId).populate('products');
      console.log('Category:', category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.render('categoryProducts', { category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/products', categoryController.getProductsByCategory);
router.patch('/:id', categoryController.getCategoryById, categoryController.updateCategory);
router.delete('/:id', categoryController.getCategoryById, categoryController.deleteCategory);

module.exports = router;
