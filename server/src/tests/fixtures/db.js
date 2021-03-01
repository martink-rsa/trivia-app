const mongoose = require('mongoose');
const Room = require('../../models/room');
const User = require('../../models/user');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

const roomOne = {
  name: 'ROOM1',
  admin: userOneId,
  users: [],
  topic: 'Programming',
};
const userOne = {
  // _id: userOneId,
  username: 'John',
  iconId: 0,
  color: 'red',
};
const userTwo = {
  // _id: userTwoId,
  username: 'Adam123',
  iconId: 1,
  color: 'green',
};
const userThree = {
  // _id: userThreeId,
  username: 'Paul',
  iconId: 2,
  color: 'blue',
};

const setupDatabase = async () => {
  await User.deleteMany(); // Delete all users before tests run
  await Room.deleteMany(); // Delete all tasks before tests run

  // Rooms
  await new Room(roomOne).save();

  // Users
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  userThreeId,
  userThree,
  roomOne,
  setupDatabase,
};
