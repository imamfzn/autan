const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 25,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('User', User);
