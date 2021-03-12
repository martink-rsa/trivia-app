import * as mongoose from 'mongoose';
// const User = require('./user');

export interface IRoom extends mongoose.Document {
  name: string;
  admin: mongoose.Schema.Types.ObjectId;
  users: mongoose.Schema.Types.ObjectId[];
  topic: string;
}

const roomSchema: mongoose.Schema = new mongoose.Schema({
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
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;
