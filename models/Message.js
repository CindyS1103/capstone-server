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
  subject: {
    type: String,
    required: true
  },
  to_user: {
    type: String,
    required: true
  },
  from_user:{
    type: String,
    required: true
  }

});

module.exports = Message = mongoose.model('message', MessageSchema);
