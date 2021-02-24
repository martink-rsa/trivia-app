const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  iconId: {
    type: Number,
    required: true,
  },
  color: {
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
