"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDatabase = exports.mockUsers = exports.mockRooms = void 0;
const mongoose = require("mongoose");
const room_model_1 = require("../../models/room.model");
const user_model_1 = require("../../models/user.model");
const userOneId = new mongoose.Types.ObjectId();
const mockRooms = [
    {
        name: 'ROOM1',
        admin: userOneId,
        users: [],
        topic: 'Programming',
    },
];
exports.mockRooms = mockRooms;
const mockUsers = [
    {
        username: 'MICHAEL',
        iconId: 0,
        colorId: 0,
        socketId: 'abc',
    },
    {
        username: 'PAM',
        iconId: 1,
        colorId: 1,
        socketId: 'def',
    },
    {
        username: 'JIM',
        iconId: 2,
        colorId: 2,
        socketId: 'xyz',
    },
];
exports.mockUsers = mockUsers;
const setupDatabase = async () => {
    await user_model_1.default.deleteMany();
    await room_model_1.default.deleteMany();
    // Rooms
    mockRooms.forEach((room) => {
        new room_model_1.default(room).save();
    });
    // Users
    mockUsers.forEach((user) => {
        new user_model_1.default(user).save();
    });
};
exports.setupDatabase = setupDatabase;
//# sourceMappingURL=db.js.map