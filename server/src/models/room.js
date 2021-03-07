const mongoose = require('mongoose');
// const User = require('./user');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 5,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  /* // Game logic
  currentState: {
    type: String,
    required: true,
    trim: true,
  }, */
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
