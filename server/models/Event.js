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
  },
  end_date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  ticketInformation: {
    type: String,
    required: true,
  },
  max_stalls: {
    type: Number, required: true
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

// the virtual property upcomingEvents
eventSchema.virtual('upcomingEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'date',
  options: { sort: { date: 1 } }, // Sort by date in ascending order
  //options: { sort: { date: 1 }, limit: 5 } // Sort by date in ascending order and limit to 5 upcoming events
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;



