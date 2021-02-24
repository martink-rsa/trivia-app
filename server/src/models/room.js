const mongoose = require('mongoose');
// const User = require('./user');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  users: {
    type: Array,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
