const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

employeeSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  let age = today.getFullYear() - this.dateOfBirth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > this.dateOfBirth.getMonth() ||
    (today.getMonth() === this.dateOfBirth.getMonth() && today.getDate() >= this.dateOfBirth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
