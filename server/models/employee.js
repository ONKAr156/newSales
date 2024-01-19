const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileCreationDate: {
    type: String,
    required: true,
  },
  sale: {
    type: Number,
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  referalID: {
    type: String,
    required: true,
    unique: true
  },
  OTP: {
    type: Number,
  },
  otpCreatedAt: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
