const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestimonialSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    ref: 'user'
  },
  content: {
    type: String
  },

});

module.exports = Testimonial = mongoose.model('testimonial', TestimonialSchema);
