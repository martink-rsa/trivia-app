const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT;

const server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('Server: User connected');
  socket.emit('userConnected', 'You have connected');

  /** User is attempting to join the room */
  socket.on('attemptJoin', ({ name, room }) => {
    console.log('ATTEMPTING TO JOIN');
    console.log(name, room);
  });

  /** User has disconnected from websocket */
  socket.on('disconnect', () => {
    console.log('Server: User disconnected');
  });
});