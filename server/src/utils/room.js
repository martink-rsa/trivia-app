const Room = require("../models/room");

const createRoom = async (details) => {
  const room = new Room(details);
  await room.save();
};

const findRoom = async (roomName) => {
  try {
    return await Room.findOne({ name: roomName });
  } catch (err) {
    return null;
  }
};

module.exports = { createRoom, findRoom };
