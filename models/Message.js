const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  },
  provider_name: {
    type: String,
    required: true
  },
  child_name: {
    type: String,
    required: true
  }


});

module.exports = Message = mongoose.model('message', MessageSchema);
