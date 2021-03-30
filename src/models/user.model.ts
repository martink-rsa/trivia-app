import { model, Schema, Document, Types } from 'mongoose';
import validator from 'validator';
import log from '../utils/log';

import { serverIo, games } from '../index';

import { Room, IRoom, IRoomDoc } from './room.model';

interface IUser {
  username: string;
  iconId: number;
  colorId: number;
  socketId: string;
  isAdmin: boolean;
}

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof IUser, any> = {
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
};

const UserSchema = new Schema(UserSchemaFields);

UserSchema.virtual('room', {
  ref: 'User',
  // What field is referenced when used by the other 'object'
  // This is like the foreign key
  localField: '_id',
  // This is the field on the referenced 'object', e.g. Task
  // This is like what the foreign key is called
  foreignField: 'admin',
});

UserSchema.pre('deleteOne', { document: true, query: false }, async function () {
  const user = this;

  const room: IRoomDoc | null = await Room.findOne({ users: user })
    .populate('users')
    .exec();

  if (room) {
    if (room.users.length <= 1) {
      room
        .deleteOne()
        .then(() => {
          log.success('Last user in room left, deleted room');
        })
        .catch((error: any) => {
          throw new Error(error);
        });
    } else {
      // Filtering out the player that is leaving
      const newUserList: any = (room.users as Array<IUser>).filter((currentUser: any) => {
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
  }
});

const User = model<IUserDoc>('User', UserSchema);

export { User, IUser };
