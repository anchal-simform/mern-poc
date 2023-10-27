const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: Array,
  total: Number,
  userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Order', orderSchema);