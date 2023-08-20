const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
  // Product schema fields
  name: { type: String, required: true },
  description: {
    type: String,
    required: false,
  },
 /*  stall: { type: mongoose.Schema.Types.ObjectId, ref: 'Stall' }, // Reference to Stall model */
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;


//seed the products,and add it into stall model when the stall owner adds it..
//future develop: admin can add products
