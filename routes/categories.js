const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById, categoryController.renderCategoryProducts);
router.patch('/:id', categoryController.getCategoryById, categoryController.updateCategory);
router.delete('/:id', categoryController.getCategoryById, categoryController.deleteCategory);

module.exports = router;

