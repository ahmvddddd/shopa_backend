const express = require('express');
const multer = require('multer');
const { uploadProduct, updateProduct, deleteProduct, getProducts, getProductsByTag } = require('../../controllers/products/productController');
const { getProductsGroupedByCategory } = require('../../controllers/products/categoryController')

const router = express.Router();
const upload = multer();

router.post('/upload', upload.array('productImages'), uploadProduct);
router.put('/update/:id', upload.array('productImages'), updateProduct);
router.delete('/delete/:productId', deleteProduct);
router.get('/products/', getProducts);
router.get('/tag/:tag', getProductsByTag);
router.get('/category', getProductsGroupedByCategory);

module.exports = router;