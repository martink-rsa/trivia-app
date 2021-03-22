import * as mongoose from 'mongoose';
import validator from 'validator';
import log from '../utils/log';

import { serverIo, games } from '../index';

import Room from './room.model';

export interface IUser extends mongoose.Document {
  username: string;
  iconId: number;
  colorID: number;
  socketId: string;
  isAdmin: boolean;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter  a username'],
    trim: [true, 'That username is taken'],
    unique: true,
    validate(value: string) {
      if (!validator.isAlphanumeric(value)) {
        throw new Error('Username can only contain letters and numbers');
      }
    },
  },
  iconId: {
    type: Number,
    required: true,
  },
  colorId: {
    type: Number,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
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

userSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const user = this;

  const room = await (
    await Room.findOne({ users: user }).populate('users')
  ).execPopulate();

  if (room.users.length <= 1) {
    room
      .deleteOne()
      .then(() => {
        log.success('Last user in room left, deleted room');
      })
      .catch((error) => {
        throw new Error(error);
      });
  } else {
    // Filtering out the player that is leaving
    const newUserList: any = room.users.filter((currentUser: any) => {
      return currentUser._id.toString() !== user._id.toString();
    });
    room.users = newUserList;
    // Setting the new admin
    if (user._id.toString() === room.admin.toString()) {
      newUserList[0].isAdmin = true;
      room.admin = newUserList[0];
      newUserList[0].save();
    }
    await room.save();
    serverIo.to(room.name).emit('updatePlayers', newUserList);

    // Setting the player that left as finished so other players don't
    //    have to wait for that player's timers to finish
    //  We want the player to still show up as participation in the score
    //    which is why they aren't simply deleted
    if (games[room._id]) {
      games[room.id].handlePlayerLeaving(user._id);
    }
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
