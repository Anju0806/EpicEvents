const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
// Define the User schema
const userSchema = new mongoose.Schema({
  // User schema fields
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z]{2,}$/ // Regular expression for email validation
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false // Set the default value to false 
  },

  //all associated events(all events joined by user)
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Reference to Event model
  //all stalls (all stalls created by user)
  stalls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stall' }], // Reference to Stall model

});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;