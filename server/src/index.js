const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const validator = require('validator');
const chalk = require('chalk');
const log = require('./utils/log');

const Error = require('./shared/errors');

const User = require('./models/user');
const Room = require('./models/room');

const port = process.env.PORT;

const server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

function handleConnect(socket) {
  // socket.join(user.room);
  // socket.emit('gameState', 'LOBBY');
}

io.on('connection', (socket) => {
  console.log('Server: + Connected ID:', socket.id);
  socket.emit('userConnected', 'You have connected');

  handleConnect(socket);

  socket.on('serverTest', (message) => {
    console.log(message);
  });

  // When a user attempts to join the game
  socket.on('attemptJoin', async ({ username = '', room = '' }, callback) => {
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
      return callback(Error.noUsername);
    }
    if (usernameNotValid) {
      return callback(Error.invalidUsername);
    }

    // Room
    const roomNotValid = !validator.isAlphanumeric(room);
    if (!room) {
      return callback(Error.noRoom);
    }
    if (roomNotValid) {
      return callback(Error.invalidRoom);
    }

    // Adding the user
    let newUser;
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
        return callback(Error.usernameUnavailable);
      } else {
        return callback(Error.unknownErrorUsername);
      }
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
      foundRoom = await Room.findOne({ name: room });
    } catch (error) {
      console.log(error);
    }

    let savedRoom;
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
      const newRoom = Room({
        name: room,
        admin: newUser._id,
        users: [newUser._id],
        topic: 'Programming',
      });
      savedRoom = await newRoom.save();
      log.info('User created room');
    }

    // Socket.io add user to room
    try {
      socket.join(room);
      io.to(room).emit('roomMessage', 'Hello user, welcome to the room');
      log.info('User added to socket.io room');
    } catch (error) {
      return callback({
        error: 'unknownError',
        info: 'Unknown error when adding user to Socket.io room',
        field: '',
      });
    }

    // Updating game state for user
    socket.emit('updateGameState', 'LOBBY');

    // Get the players in the room
    const currentRoom = await (
      await Room.findOne({ name: room }).populate('users')
    ).execPopulate();
    const users = currentRoom.users;
    io.to(room).emit('updatePlayers', users);

    // Get the players in the room
  });

  socket.on('gameStart', async (data) => {
    // Only want admin to trigger the game starting
    // Get the correct socketId admin id from the User model
    // Check if the parameter is the same as the admin id
    try {
      const user = await User.findOne({ socketId: socket.id });
      const room = await Room.findOne({ users: user });
      console.log('user._id === room.admin:', user._id, room.admin);
      if (user._id.toString() === room.admin.toString()) {
        //
        console.log('IS ADMIN');
      }
    } catch (error) {
      //
    }
    console.log('Trigger game start');
  });

  socket.on('testMessage', async () => {
    console.log('Server: Test message received');
  });
  /** User has disconnected from websocket */
  socket.on('disconnect', async () => {
    console.log('Server: - Disconnected ID:', socket.id);
    const user = await User.deleteOne({ socketId: socket.id });

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
});

module.exports = { io, server };
