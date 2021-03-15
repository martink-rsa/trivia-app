import * as mongoose from 'mongoose';
import Room from '../../models/room.model';
import User from '../../models/user.model';

const userOneId = new mongoose.Types.ObjectId();

const mockRooms = [
  {
    name: 'ROOM1',
    admin: userOneId,
    users: [],
    topic: 'Programming',
  },
];

const mockUsers = [
  {
    username: 'MICHAEL',
    iconId: 0,
    color: 'red',
    socketId: 'abc',
  },
  {
    username: 'PAM',
    iconId: 1,
    color: 'green',
    socketId: 'def',
  },
  {
    username: 'JIM',
    iconId: 2,
    color: 'blue',
    socketId: 'xyz',
  },
];

const setupDatabase = async () => {
  await User.deleteMany();
  await Room.deleteMany();

  // Rooms
  mockRooms.forEach((room) => {
    new Room(room).save();
  });

  // Users
  mockUsers.forEach((user) => {
    new User(user).save();
  });
};

export { mockRooms, mockUsers, setupDatabase };
