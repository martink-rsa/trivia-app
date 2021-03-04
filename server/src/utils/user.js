const User = require('../models/user');

const addUser = async (user) => {
  const newUser = new User(user);
  const message = await newUser
    .save()
    .then(() => {
      return 'Added';
    })
    .catch((error) => {
      return 'Failed';
    });
  return message;
};

const removeUser = (id) => {};

const removeAllUsers = () => {};

const getUser = (id) => {};

const getUserFromName = async (username) => {
  const user = await User.findOne({ username });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUserFromName,
  getAllUsers,
  removeAllUsers,
};
