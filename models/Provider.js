const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProviderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  age: {
    type: String
  },
  birthdate: {
    type: String
  },
  vehicle: {
    type: String
  },
  provider_img: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    type: String
},
  notes: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }

});

module.exports = Provider = mongoose.model('provider', ProviderSchema);
