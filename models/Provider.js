const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProviderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  age: {
    type: Number,
    required: true
  },
  vehicle: {
    type: String
  },
  provider_img: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },

});

module.exports = Provider = mongoose.model('provider', ProviderSchema);
