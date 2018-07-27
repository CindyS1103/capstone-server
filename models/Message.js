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
    type: String

  },
  subject: {
    type: String

  },
  recipient: {
    type: String
  },
  sender: {
    type: String
  },
  reply:{
    type: String
  }


});

module.exports = Message = mongoose.model('message', MessageSchema);
