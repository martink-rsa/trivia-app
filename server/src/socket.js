const { server } = require('./index');

/* const socketIo = require('socket.io');

const io = socketIo.listen(server);

io.on('connection', (socket) => {
  console.log('Server: User connected');
  socket.emit('gameState', 'LOBBY');
  socket.emit('userConnected', 'You have connected ?');

  // User is attempting to join the room
  socket.on('attemptJoin', ({ name, room }) => {
    console.log('ATTEMPTING TO JOIN');
    console.log(name, room);
  });

  socket.on('test', (message) => {
    console.log('TEST FIRED, YEAH BOI');
    console.log(message);
  });

  // User has disconnected
  socket.on('disconnect', () => {
    console.log('Server: User disconnected');
  });
});
 */
