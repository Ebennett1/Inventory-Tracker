// Category model - category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' 
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);

