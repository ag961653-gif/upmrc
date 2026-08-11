const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    default: '#',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Circular = mongoose.model('Circular', circularSchema);
module.exports = Circular;
