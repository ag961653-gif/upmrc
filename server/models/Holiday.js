const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

const Holiday = mongoose.model('Holiday', holidaySchema);
module.exports = Holiday;
