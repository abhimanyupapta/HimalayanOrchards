const mongoose = require('mongoose');

const customDetailsSchema = new mongoose.Schema({
  contactDetails: {
    email: {
      type: String
    },
    phone: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
  },
});

module.exports = mongoose.model('CustomDetails', customDetailsSchema);