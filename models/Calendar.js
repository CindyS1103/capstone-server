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
    type: String

  },
  assigned_child: {
    type: String

  },
  child_age: {
    type: Number

  },
  child_img:{
    type: String

  },
  pickup_address:{
    type: String

  },
  parent_name:{
    type: String

  },
  hours_type:{
    type: String

  },
  hours:{
    type: Number

  },
  pickup_time:{
    type: String

  },
  event_name:{
    type: String
  },
  activities_location:{
    type: String
  },
  activities_start:{
    type: String
  },
  activities_end:{
    type: String
  },
  notes:{
    type: String
  }

});

module.exports = Calendar = mongoose.model('calendar', CalendarSchema);
