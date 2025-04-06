const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [{
    productId: String,
    productName: String,
    productPrice: Number,
    quantity: Number,
  }],
  totalAmount: Number,
  deliveryStatus: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);



