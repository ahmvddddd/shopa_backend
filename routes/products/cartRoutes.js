const express = require('express');
const { addToCart, clearCart, removeFromCart, getCartProducts } = require('../../controllers/products/cartController');
const { protect } = require('../../middlewares/auth_middleware');
const router = express.Router();

router.post('/add', addToCart);
router.delete('/remove/:productId', protect,  removeFromCart);
router.delete('/clear', protect, clearCart);
router.get('/getcart', protect, getCartProducts);

module.exports = router;