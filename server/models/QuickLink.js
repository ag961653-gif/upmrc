const mongoose = require('mongoose');

const quickLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
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

const QuickLink = mongoose.model('QuickLink', quickLinkSchema);
module.exports = QuickLink;
