const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const validator = require('validator');

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
  console.log('HANDLING CONNECT');
  // socket.join(user.room);
  // socket.emit('gameState', 'LOBBY');
}

io.on('connection', (socket) => {
  console.log('Server: User connected');
  socket.emit('userConnected', 'You have connected');

  handleConnect(socket);

  socket.on('serverTest', (message) => {
    console.log(message);
  });

  // When a user attempts to join the game
  socket.on('attemptJoin', ({ username = '', room = '' }, callback) => {
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
      return callback({
        error: 'syntaxError',
        message: 'No username has been provided',
        field: 'username',
      });
    }
    if (usernameNotValid) {
      return callback({
        error: 'syntaxError',
        message: 'Username is invalid',
        field: 'username',
      });
    }

    // Room
    const roomNotValid = !validator.isAlphanumeric(room);
    if (!room) {
      return callback({
        error: 'syntaxError',
        message: 'No room has been provided',
        field: 'room',
      });
    }
    if (roomNotValid) {
      return callback({
        error: 'syntaxError',
        message: 'Room name is invalid',
        field: 'room',
      });
    }

    console.log('ATTEMPTING TO JOIN');
    console.log(username, room);
  });

  /** User has disconnected from websocket */
  socket.on('disconnect', () => {
    console.log('Server: User disconnected');
  });
});

module.exports = { io };
