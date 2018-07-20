const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChildSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  child_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  child_img:{
    type: String

  },
  address:{
    type: String,
    required: true
  },
  parent_name:{
    type: String,
    required: true
  },
  notes:{
    type: String,
    required: true
  },
  assigned_provider:{
    type: Schema.Types.ObjectId,
    ref: 'provider'
  }

});

module.exports = Child = mongoose.model('child', ChildSchema);
