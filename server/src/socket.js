const { server } = require('./index');

const socketIo = require('socket.io');

const io = socketIo.listen(server);

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
