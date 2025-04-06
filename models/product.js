const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productDescription: String,
  productImages: [{ type: Buffer }],
  productCategory: String,
  productSku: Number,
  tags: [{ type: String }]
});

module.exports = mongoose.model('Product', productSchema);