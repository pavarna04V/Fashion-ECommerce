const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  category: String,
  price: Number,
  popularity: Number,
  stock: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);