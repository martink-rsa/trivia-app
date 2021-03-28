"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchemaFields = {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 5,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    game: {
        type: mongoose_1.Schema.Types.Mixed,
    },
};
const RoomSchema = new mongoose_1.Schema(RoomSchemaFields);
const Room = mongoose_1.model('Room', RoomSchema);
exports.Room = Room;
//# sourceMappingURL=room.model.js.map