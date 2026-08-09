const mongoose = require('mongoose');

const newsClippingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const NewsClipping = mongoose.model('NewsClipping', newsClippingSchema);
module.exports = NewsClipping;
