"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validator_1 = require("validator");
const log_1 = require("../utils/log");
const index_1 = require("../index");
const room_model_1 = require("./room.model");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Enter  a username'],
        trim: [true, 'That username is taken'],
        unique: true,
        validate(value) {
            if (!validator_1.default.isAlphanumeric(value)) {
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
});
userSchema.virtual('room', {
    ref: 'User',
    // What field is referenced when used by the other 'object'
    // This is like the foreign key
    localField: '_id',
    // This is the field on the referenced 'object', e.g. Task
    // This is like what the foreign key is called
    foreignField: 'admin',
});
userSchema.pre('deleteOne', { document: true, query: false }, async function () {
    const user = this;
    const room = await (await room_model_1.default.findOne({ users: user }).populate('users')).execPopulate();
    if (room.users.length <= 1) {
        room
            .deleteOne()
            .then(() => {
            log_1.default.success('Last user in room left, deleted room');
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    else {
        // Filtering out the player that is leaving
        const newUserList = room.users.filter((currentUser) => {
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
        index_1.serverIo.to(room.name).emit('updatePlayers', newUserList);
        // Setting the player that left as finished so other players don't
        //    have to wait for that player's timers to finish
        //  We want the player to still show up as participation in the score
        //    which is why they aren't simply deleted
        if (index_1.games[room._id]) {
            index_1.games[room.id].handlePlayerLeaving(user._id);
        }
    }
});
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map