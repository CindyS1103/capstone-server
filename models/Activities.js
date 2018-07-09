const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ActivitiesSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  activity_name: {
    type: String,
    ref: 'user'
  },
  activity_description: {
    type: String,
    required: true
  },
  activity_location: {
    type: String

  },
  activity_time: {
    type: String

  },

});

module.exports = Activities = mongoose.model('activities', ActivitiesSchema);
