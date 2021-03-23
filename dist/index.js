"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.games = exports.server = exports.serverIo = void 0;
const socket_io_1 = require("socket.io");
const validator_1 = require("validator");
const http = require("http");
const app_1 = require("./app");
const log_1 = require("./utils/log");
const errors_1 = require("./shared/errors");
const user_model_1 = require("./models/user.model");
const room_model_1 = require("./models/room.model");
const game_1 = require("./utils/game");
const topics_1 = require("./utils/topics");
const utils_1 = require("./utils/utils");
const PORT = process.env.PORT;
// const QUESTIONS_SERVER_URL = process.env.QUESTIONS_SERVER_URL;
const games = {};
exports.games = games;
const server = http.createServer(app_1.default).listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
exports.server = server;
const serverIo = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
exports.serverIo = serverIo;
serverIo.on('connection', (socket) => {
    console.log('Server: + Connected ID:', socket.id);
    socket.emit('userConnected', 'You have connected');
    socket.on('serverTest', (message) => {
        console.log(message);
    });
    // When a user attempts to join the game
    // eslint-disable-next-line consistent-return
    socket.on('attemptJoin', async ({ username = '', room = '', iconId = 0, colorId = 0 }, callback) => {
        // Steps:
        // 1. User clicks join
        // 2. Check that the username is valid
        // 2.1 Username is not empty
        // 2.2 Username is only alphanumeric
        // 2.2 Room is not empty
        // 3. Check username is taken or not
        // Validation: Username
        const usernameNotValid = !validator_1.default.isAlphanumeric(username);
        if (!username) {
            return callback(errors_1.default.noUsername);
        }
        if (usernameNotValid) {
            return callback(errors_1.default.invalidUsername);
        }
        // Validation: Room
        const roomNotValid = !validator_1.default.isAlphanumeric(room);
        if (!room) {
            return callback(errors_1.default.noRoom);
        }
        if (roomNotValid) {
            return callback(errors_1.default.invalidRoom);
        }
        // Validation: Icon ID
        const ICON_COUNT = 9;
        const iconIdNotValid = !validator_1.default.isInt(iconId.toString());
        if (iconIdNotValid) {
            return callback(errors_1.default.invalidIconIdType);
        }
        if (iconId < 0 || iconId > ICON_COUNT - 1) {
            return callback(errors_1.default.invalidIconIdValue);
        }
        // Validation: Icon ID
        const COLOR_COUNT = 6;
        const colorIdNotValid = !validator_1.default.isInt(colorId.toString());
        if (colorIdNotValid) {
            return callback(errors_1.default.invalidColorIdType);
        }
        if (colorId < 0 || colorId > COLOR_COUNT - 1) {
            return callback(errors_1.default.invalidColorIdValue);
        }
        // Adding the user
        let newUser;
        try {
            const user = new user_model_1.default({
                username,
                room,
                iconId,
                colorId,
                socketId: socket.id,
                isAdmin: false,
            });
            newUser = await user.save();
        }
        catch (error) {
            if (error.code && error.code === 11000) {
                return callback(errors_1.default.usernameUnavailable);
            }
            return callback(errors_1.default.unknownErrorUsername);
        }
        // Logging user
        log_1.default('====================================');
        log_1.default.success(`User Added: ${newUser.username} -> ${room}`);
        log_1.default('------------------------------------');
        Object.keys(newUser._doc).forEach((field) => log_1.default(`◦ ${field}: ${newUser._doc[field]}`));
        log_1.default('====================================');
        // Joining a room
        // 1. Check room exists
        // 1.1 If room exists, add user to room
        // 1.2 If room doesn't exist, create room with user as admin
        let foundRoom;
        try {
            foundRoom = await room_model_1.default.findOne({ name: room });
            if (foundRoom) {
                // Joining an existing room
                log_1.default.info('Room exists');
                if (!foundRoom.users.includes(newUser._id)) {
                    foundRoom.users.push(newUser._id);
                    await foundRoom.save();
                    log_1.default.info('User added to existing MongoDB room');
                }
                else {
                    log_1.default.error('User is already added to room');
                    // eslint-disable-next-line node/no-callback-literal
                    return callback({
                        error: 'serverError',
                        info: 'User is already added to the room',
                        field: '',
                    });
                }
            }
            else {
                // Creating a new room
                log_1.default.info('Room does not exist');
                const newRoom = new room_model_1.default({
                    name: room,
                    admin: newUser._id,
                    users: [newUser._id],
                    topic: 'Programming',
                });
                await newRoom.save();
                log_1.default.info('User created room');
                newUser.isAdmin = true;
                await newUser.save();
                log_1.default.info('User made admin of new room');
            }
        }
        catch (error) {
            console.log(error);
        }
        // Socket.io add user to room
        try {
            socket.join(room);
            serverIo.to(room).emit('roomMessage', 'Hello user, welcome to the room');
            log_1.default.info('User added to socket.io room');
        }
        catch (error) {
            // eslint-disable-next-line node/no-callback-literal
            return callback({
                error: 'unknownError',
                info: 'Unknown error when adding user to Socket.io room',
                field: '',
            });
        }
        const topics = topics_1.default.getOnlyTopics();
        socket.emit('updateTopics', topics);
        // Updating game state for user
        socket.emit('updateGameState', 'LOBBY');
        // Get the players in the room
        const currentRoom = await (await room_model_1.default.findOne({ name: room }).populate('users')).execPopulate();
        const { users } = currentRoom.toObject();
        // Adding 'isAdmin' flag
        const updatedUsers = users.map((user) => ({
            ...user,
            isAdmin: user._id.toString() === currentRoom.admin.toString(),
        }));
        serverIo.to(room).emit('updatePlayers', updatedUsers);
        const successMessage = {
            status: 200,
        };
        callback(successMessage);
    });
    socket.on('gameStart', async (data, callback) => {
        // * Only want admin to trigger the game starting
        // * Get the correct socketId admin id from the User model
        // * Check if the parameter is the same as the admin id
        // Trying to avoid passing in parameters so that people can't
        //    pass in fake/forged values e.g. they pass in a room that they are
        //    not part of.
        // We fetch the user using the socket.io id, then fetch the room based on
        //    this user.
        // The fetched room is what is used as the emit room target, otherwise we'd
        //    have to resort to a room name being passed as a param
        log_1.default.info('gameStart event');
        const { selectedTopic, numberQuestions, questionsDuration } = data;
        log_1.default.info('Topic:', selectedTopic, 'questions:', numberQuestions, 'duration:', questionsDuration);
        // Validation: Topics
        const topics = topics_1.default.getOnlyTopics();
        const isTopic = topics.reduce((foundTopic, topic) => {
            if (topic.id === selectedTopic) {
                foundTopic = true;
            }
            return foundTopic;
        }, false);
        if (!isTopic) {
            return callback(errors_1.default.invalidTopicValue);
        }
        // Validation: Number of questions
        const numberQuestionsInvalidType = typeof numberQuestions !== 'number';
        if (numberQuestionsInvalidType) {
            return callback(errors_1.default.invalidNumberQuestionsType);
        }
        if (numberQuestions <= 0 || numberQuestions >= 99) {
            return callback(errors_1.default.invalidNumberQuestionsValue);
        }
        // Validation: Questions duration
        const questionsDurationInvalidType = typeof questionsDuration !== 'number';
        if (questionsDurationInvalidType) {
            return callback(errors_1.default.invalidQuestionsDurationType);
        }
        if (questionsDuration <= 0 || questionsDuration >= 21) {
            return callback(errors_1.default.invalidQuestionsDurationValue);
        }
        try {
            // Get the user using socket.io id
            const user = await user_model_1.default.findOne({ socketId: socket.id });
            if (!user) {
                return callback(errors_1.default.incorrectUserStartGame);
            }
            // Find the room the player is in. This is needed to check the player
            // is admin, but also later to emit to this room
            const room = await room_model_1.default.findOne({ users: user }).populate('users');
            if (!room) {
                return callback(errors_1.default.incorrectUserStartGame);
            }
            // See if player's id matches the admin id
            if (user._id.toString() === room.admin.toString()) {
                log_1.default.info('Game starting', room.name, selectedTopic, numberQuestions);
                const questions = utils_1.getRandomQuestions(selectedTopic, numberQuestions);
                const users = [...room.users];
                const config = {
                    roomId: room._id,
                    roomName: room.name,
                    questions: questions,
                    topic: selectedTopic,
                    numQuestions: 5,
                    players: users,
                    questionDuration: questionsDuration * 1000,
                };
                const game = new game_1.default(config);
                room.game = game;
                games[room._id] = game;
                await room.save();
                room.game.startGame();
                serverIo.to(room.name).emit('updateGameState', 'GAME');
            }
            else {
                callback(errors_1.default.incorrectUserStartGame);
            }
        }
        catch (error) {
            callback(errors_1.default.incorrectUserStartGame);
        }
    });
    socket.on('playerAnswer', async (data, callback) => {
        const user = await user_model_1.default.findOne({ socketId: socket.id });
        const room = await room_model_1.default.findOne({ users: user });
        const { index } = data;
        games[room._id].handleAnswer(parseInt(index), user._id);
    });
    socket.on('backToJoinGame', async () => {
        serverIo.emit('updateGameState', 'JOIN');
    });
    socket.on('testMessage', async () => {
        console.log('Server: Test message received');
    });
    /** User has disconnected from websocket */
    socket.on('disconnect', async () => {
        // 1. Delete player from room
        // 1. If player was admin, assign new admin
        // 2. Update room player list
        // 4. If no players left, delete MongoDB room and sockets.io room
        console.log('Server: - Disconnected ID:', socket.id);
        const user = await user_model_1.default.findOne({ socketId: socket.id });
        if (user) {
            user.deleteOne();
        }
    });
    // This adapter will automatically be called with the 'on' events
    // I found this in the documentation and it could be extremely useful
    /*
    https://socket.io/docs/v3/rooms/#Disconnection
    Starting with socket.io@3.1.0, the underlying Adapter will emit the following events:
  
      create-room (argument: room)
      delete-room (argument: room)
      join-room (argument: room, id)
      leave-room (argument: room, id)
    */
    serverIo.of('/').adapter.on('join-room', (room, id) => {
        // console.log(`socket ${id} has joined room ${room}`);
    });
});
//# sourceMappingURL=index.js.map