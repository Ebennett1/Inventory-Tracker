const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/add', productController.renderAddProductForm);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
