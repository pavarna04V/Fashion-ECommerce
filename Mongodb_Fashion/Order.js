const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  data: {
    emailAddress: String,
    firstName: String,
    lastName: String,
    company: String,
    address: String,
    apartment: String,
    city: String,
    country: String,
    region: String,
    postalCode: String,
    phone: String,
    paymentType: String,
    cardNumber: { type: String, select: false },
    nameOnCard: { type: String, select: false },
    expirationDate: { type: String, select: false },
    cvc: { type: String, select: false }
  },
  products: [{
    id: String,
    image: String,
    title: String,
    category: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
    popularity: Number,
    stock: Number
  }],
  subtotal: Number,
  user: {
    email: String,
    id: mongoose.Schema.Types.Mixed
  },
  orderStatus: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);