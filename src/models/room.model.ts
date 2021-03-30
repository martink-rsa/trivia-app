import { model, Schema, Document } from 'mongoose';
import Game from '../utils/game';
import { IUser } from './user.model';

interface IRoom {
  name: string;
  admin: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[] | IUser[];
  topic: string;
  game: Game;
}

interface IRoomDoc extends IRoom, Document {}

const RoomSchemaFields: Record<keyof IRoom, any> = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 5,
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  game: {
    type: Schema.Types.Mixed,
  },
};

const RoomSchema = new Schema(RoomSchemaFields);

const Room = model<IRoomDoc>('Room', RoomSchema);

export { Room, IRoom, IRoomDoc };
