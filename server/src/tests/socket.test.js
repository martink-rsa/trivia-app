const io = require('socket.io-client');
const { setupDatabase } = require('./fixtures/db');

let socket;

beforeEach(() => {
  socket = io.connect(`http://localhost:3001`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
});

afterEach((done) => {
  socket.disconnect();
  done();
});

describe('basic socket.io example', () => {
  test('should emit a message from client to server', async (done) => {
    await socket.emit('testMessage', 'Message sent to server successfully');
    // Needed to prevent test timeout
    setTimeout(() => {
      done();
    }, 1000);
  });
});
