const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);