const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Stall schema
const stallSchema = new mongoose.Schema({
  // Stall schema fields
  title: { 
    type: String, required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  //stall number,easily readable
  number: { 
    type: String, required: true, 
  },
  contact_number: { 
    type: String, required: false,
   },
  image: {
    type: String,
    required: false,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User model
 // events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Reference to Event model
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Reference to Product model
});

const Stall = mongoose.model('Stall', stallSchema);
module.exports = Stall;



