 const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Event schema
const eventSchema = new mongoose.Schema({
  // Event schema fields
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 280,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  start_date: {
    type: Date,
    required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  end_date: {
    type: Date,
    required: false,
    get: (timestamp) => dateFormat(timestamp),
  },
  start_time: {
    type: String,
    required: false,
    
  },
  end_time: {
    type: String,
    required: false,
  },
  ticketInformation: {
    type: String,
    required: false,
  },
  max_stalls: {
    type: Number, required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  image: {
    type: String,
    required: false,
  },
  stalls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stall',
  }],
  //members attending events
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// the virtual property total attendees
eventSchema.virtual('attendeesCount').get(function () {
  return this.attendees.length;
});


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;



