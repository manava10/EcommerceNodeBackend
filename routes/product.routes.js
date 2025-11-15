const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.Controllers');
const middleware = require('../middleware/role.middleware'); //THis is above all , all the export and import

router.post('/products/create',middleware.adminRole,ProductController.createProduct);
router.get('/products',ProductController.allProducts);
router.patch('/products/:id',middleware.adminRole,ProductController.updateProduct);
router.delete('/products/:id',middleware.adminRole,ProductController.deleteProduct);

module.exports = router;