import { getRandomQuestions } from './utils/utils';

import { Server } from 'socket.io';
import validator from 'validator';
import * as http from 'http';

import app from './app';
import log from './utils/log';

import Errors from './shared/errors';

import User from './models/user.model';
import Room from './models/room.model';

const port = process.env.PORT;

const server = http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

/* const serverIo = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
}); */

const serverIo = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

function startGame(topic: any, totalQuestions: any) {
  console.log('game starting:', topic, totalQuestions);
  // const questions = getRandomQuestions();
  // 1. Get randomized list of questions
}

serverIo.on('connection', (socket: any) => {
  console.log('Server: + Connected ID:', socket.id);
  socket.emit('userConnected', 'You have connected');
  // console.log('Clients connected:', serverIo.engine.clientsCount);

  socket.on('serverTest', (message: any) => {
    console.log(message);
  });

  // When a user attempts to join the game
  // eslint-disable-next-line consistent-return
  socket.on('attemptJoin', async ({ username = '', room = '' }, callback: any) => {
    // Steps:
    // 1. User clicks join
    // 2. Check that the username is valid
    // 2.1 Username is not empty
    // 2.2 Username is only alphanumeric
    // 2.2 Room is not empty
    // 3. Check username is taken or not

    // Username
    const usernameNotValid = !validator.isAlphanumeric(username);
    if (!username) {
      return callback(Errors.noUsername);
    }
    if (usernameNotValid) {
      return callback(Errors.invalidUsername);
    }

    // Room
    const roomNotValid = !validator.isAlphanumeric(room);
    if (!room) {
      return callback(Errors.noRoom);
    }
    if (roomNotValid) {
      return callback(Errors.invalidRoom);
    }

    // Adding the user
    let newUser: any;
    try {
      const user = new User({
        username,
        room,
        iconId: 0,
        color: 'red',
        socketId: socket.id,
      });
      newUser = await user.save();
    } catch (error) {
      if (error.code && error.code === 11000) {
        return callback(Errors.usernameUnavailable);
      }
      return callback(Errors.unknownErrorUsername);
    }

    // Logging user
    log('====================================');
    log.success(`User Added: ${newUser.username} -> ${room}`);
    log('------------------------------------');
    Object.keys(newUser._doc).forEach((field) =>
      log(`◦ ${field}: ${newUser._doc[field]}`),
    );
    log('====================================');

    // Joining a room
    // 1. Check room exists
    // 1.1 If room exists, add user to room
    // 1.2 If room doesn't exist, create room with user as admin
    let foundRoom;
    try {
      // eslint-disable-next-line semi
      foundRoom = await Room.findOne({ name: room });
    } catch (error) {
      console.log(error);
    }

    // let savedRoom;
    if (foundRoom) {
      // Joining an existing room
      log.info('Room exists');
      if (!foundRoom.users.includes(newUser._id)) {
        foundRoom.users.push(newUser._id);
        await foundRoom.save();
        log.info('User added to existing MongoDB room');
      } else {
        log.error('User is already added to room');
        return callback({
          error: 'serverError',
          info: 'User is already added to the room',
          field: '',
        });
      }
    } else {
      // Creating a new room
      log.info('Room does not exist');
      const newRoom = new Room({
        name: room,
        admin: newUser._id,
        users: [newUser._id],
        topic: 'Programming',
      });
      await newRoom.save();
      // savedRoom = await newRoom.save();
      log.info('User created room');
    }

    // Socket.io add user to room
    try {
      socket.join(room);
      serverIo.to(room).emit('roomMessage', 'Hello user, welcome to the room');
      log.info('User added to socket.io room');
    } catch (error) {
      return callback({
        error: 'unknownError',
        info: 'Unknown error when adding user to Socket.io room',
        field: '',
      });
    }

    // Updating game state for user
    serverIo.to(room).emit('updateGameState', 'LOBBY');

    // Get the players in the room
    const currentRoom = await (
      await Room.findOne({ name: room }).populate('users')
    ).execPopulate();
    const { users } = currentRoom;
    serverIo.to(room).emit('updatePlayers', users);

    // Get the players in the room
  });

  // eslint-disable-next-line no-empty-pattern
  // eslint-disable-next-line consistent-return
  socket.on('gameStart', async ({}, callback: any) => {
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
    log.info('gameStart event');
    try {
      // Get the user using socket.io id
      const user = await User.findOne({ socketId: socket.id });
      if (!user) {
        return callback(Errors.incorrectUserStartGame);
      }

      // Find the room the player is in. This is needed to check the player
      // is admin, but also later to emit to this room
      const room = await Room.findOne({ users: user });
      if (!room) {
        return callback(Errors.incorrectUserStartGame);
      }

      // See if player's id matches the admin id
      if (user._id.toString() === room.admin.toString()) {
        log.info('Game starting');
        serverIo.to(room.name).emit('updateGameState', 'GAME');
        startGame('javascript', 5);
      } else {
        callback(Errors.incorrectUserStartGame);
      }
    } catch (error) {
      callback(Errors.incorrectUserStartGame);
    }
  });

  socket.on('testMessage', async () => {
    console.log('Server: Test message received');
  });
  /** User has disconnected from websocket */
  socket.on('disconnect', async () => {
    console.log('Server: - Disconnected ID:', socket.id);
    await User.deleteOne({ socketId: socket.id });
    // console.log('Clients connected:', serverIo.engine.clientsCount);

    // This will delete a user, but it is not currently the correct
    //  step to take because a user might not have joined the room yet
    // It needs to be called in something like a 'leaveRoom' event
    /* try {
      await User.findOneAndDelete({ socketId: socket.id });
      console.log(
        chalk.green.inverse.bold(' SUCCESS '),
        `User deleted: ${socket.id}`,
      );
    } catch (error) {
      console.log(error);
      console.log('ERROR DELETING USER?');
    } */
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
  serverIo.of('/').adapter.on('join-room', (room: any, id: any) => {
    console.log(`socket ${id} has joined room ${room}`);
  });
});

module.exports = { serverIo, server };
