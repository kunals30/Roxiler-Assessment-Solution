// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
});

module.exports = mongoose.model("Product", productSchema);
