const http = require('http');
const socketIo = require('socket.io');
const express = require('express');

const index = require('./routes/index');

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const port = process.env.PORT || 3001;

app.use(index);

server.listen(port, () => {
  console.log('Server started on port', port);
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
