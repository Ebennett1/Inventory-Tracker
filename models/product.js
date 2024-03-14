const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  addedToInventory: {
    type: Boolean,
    default: false
  },

  user: { type: mongoose.Types.ObjectId, ref: 'User'}
});


// Define text index
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
