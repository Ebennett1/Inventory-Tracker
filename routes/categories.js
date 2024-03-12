const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

// Combine getCategoryById and renderCategoryProducts into a single route
router.get('/:id', categoryController.getCategoryById, categoryController.renderCategoryProducts);
// router.get('/categories/:id/products', categoryController.getProductsByCategory);
router.patch('/:id', categoryController.getCategoryById, categoryController.updateCategory);
router.delete('/:id', categoryController.getCategoryById, categoryController.deleteCategory);

module.exports = router;

