const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CalendarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  provider_name: {
    type: String,
    required: true
  },
  assigned_child: {
    type: String,
    required: true
  },
  child_age: {
    type: Number,
    required: true
  },
  child_img:{
    type: String

  },
  pickup_address:{
    type: String,
    required: true
  },
  parent_name:{
    type: String,
    required: true
  },
  hours_type:{
    type: String,
    required: true
  },
  hours:{
    type: Number,
    required: true
  },
  pickup_time:{
    type: String,
    required: true
  },
  activities:{
    type: String
  }

});

module.exports = Calendar = mongoose.model('calendar', CalendarSchema);
