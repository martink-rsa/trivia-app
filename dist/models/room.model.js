"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
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
    game: {
        type: mongoose.Schema.Types.Mixed,
    },
});
const Room = mongoose.model('Room', roomSchema);
exports.default = Room;
//# sourceMappingURL=room.model.js.map