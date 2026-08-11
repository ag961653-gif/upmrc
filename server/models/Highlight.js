const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
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

const Highlight = mongoose.model('Highlight', highlightSchema);
module.exports = Highlight;
