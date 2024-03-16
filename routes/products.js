const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const isAuthenticated = require('../controllers/isAuthenticated');
const isDataOwner = require('../controllers/isDataOwner');
router.use(isAuthenticated)

router.post('/inventory/add', productController.addToInventory);
router.get('/inventory', productController.renderInventoryPage);
router.get('/add', productController.renderAddProductForm);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id/edit', productController.renderEditProductForm);
router.get('/:id', productController.getProductById);
router.put('/edit/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.delete('/inventory/delete/:id',  productController.deleteFromInventory);

// router.get('/:id/images', productController.fetchProductImages);



module.exports = router;
