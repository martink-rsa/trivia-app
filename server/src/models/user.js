const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter  a username'],
    trim: [true, 'That username is taken'],
    unique: true,
    validate(value) {
      if (!validator.isAlphanumeric(value)) {
        throw new Error('Username can only contain letters and numbers');
      }
    },
  },
  iconId: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});

userSchema.virtual('room', {
  ref: 'User',
  // What field is referenced when used by the other 'object'
  // This is like the foreign key
  localField: '_id',
  // This is the field on the referenced 'object', e.g. Task
  // This is like what the foreign key is called
  foreignField: 'admin',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
