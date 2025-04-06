const express = require('express');
const { placeOrder, processOrder, getOrders, calculateOrderTotal } = require('../../controllers/products/orderController');
const router = express.Router();

router.post('/place', placeOrder);
router.post('/process', processOrder);
router.get('/orders/:userId', getOrders);
router.get('/checkout/:userId', calculateOrderTotal);

module.exports = router;