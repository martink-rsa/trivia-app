const User = require('../models/user');

const addUser = async (user) => {
  console.log(user);
  const newUser = new User(user);

  await newUser.save();
};

const removeUser = (id) => {};

const removeAllUsers = () => {};

const getUser = (id) => {};

const getUserFromName = (name) => {};

const getUsersInRoom = (room) => {};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserFromName,
  getUsersInRoom,
  removeAllUsers,
};
