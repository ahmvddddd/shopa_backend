const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    productName: String,
    productPrice: Number,
    quantity: Number,
});

module.exports = mongoose.model('Cart', cartSchema);