const clientIo = require('socket.io-client');
const { setupDatabase, mockRooms, mockUsers } = require('./fixtures/db');
// require('../app');
const Room = require('../models/room');
const User = require('../models/user');
const { server } = require('../index');

const Error = require('../shared/errors');

let socket;

// Currently have to add a setTimeout in each of the tests to prevent
// the socket from disconnecting. This unfortunately adds a delay to
// each of the tests. If the duration is too low, it will cause errors.
const TIMEOUT_DURATION = 350;

beforeEach(async () => {
  await setupDatabase();
  socket = clientIo.connect(`http://localhost:3011`, {
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

afterAll(() => {
  server.close();
});

describe('basic socket.io example', () => {
  it('should emit a message from client to server', async (done) => {
    socket.emit('testMessage', 'Message sent to server successfully');
    // Needed to prevent test timeout
    setTimeout(() => {
      done();
    }, TIMEOUT_DURATION);
  });
  it('should handle a MongoDB/Mongoose request with socket.io connected', async (done) => {
    socket.emit('testMessage', 'Message sent to server successfully');
    /* const rooms = await Room.find({});
    expect(rooms.length).toBe(mockRooms.length); */
    // Needed to prevent test timeout
    setTimeout(() => {
      done();
    }, TIMEOUT_DURATION);
  });
});

describe('attemptJoin event', () => {
  describe('Username', () => {
    it('should get the correct error when no username is provided', async (done) => {
      socket.emit('attemptJoin', {}, (callback) => {
        expect(callback).toMatchObject(Error.noUsername);
      });
      // Needed to prevent test timeout
      setTimeout(() => {
        done();
      }, TIMEOUT_DURATION);
    });
    it('should get the correct error when username is invalid', async (done) => {
      socket.emit('attemptJoin', { username: 'USERNAME!@$' }, (callback) => {
        expect(callback).toMatchObject(Error.invalidUsername);
      });
      // Needed to prevent test timeout
      setTimeout(() => {
        done();
      }, TIMEOUT_DURATION);
    });
    it('should get the correct error when username is taken', async (done) => {
      socket.emit(
        'attemptJoin',
        { username: mockUsers[0].username, room: 'ABCDE' },
        (callback) => {
          expect(callback).toMatchObject(Error.usernameUnavailable);
        },
      );
      // Needed to prevent test timeout
      setTimeout(() => {
        done();
      }, TIMEOUT_DURATION);
    });
  });
  describe('Room', () => {
    it('should get the correct error when no room is provided', async (done) => {
      socket.emit('attemptJoin', { username: 'USERNAME' }, (callback) => {
        expect(callback).toMatchObject(Error.noRoom);
      });
      // Needed to prevent test timeout
      setTimeout(() => {
        done();
      }, TIMEOUT_DURATION);
    });
    it('should get the correct error when no room is provided', async (done) => {
      socket.emit(
        'attemptJoin',
        { username: 'USERNAME', room: 'ROO#M!' },
        (callback) => {
          expect(callback).toMatchObject(Error.invalidRoom);
        },
      );
      // Needed to prevent test timeout
      setTimeout(() => {
        done();
      }, TIMEOUT_DURATION);
    });
  });
  describe('Join success', () => {
    it('should add a user to a room if correct details are provided', async (done) => {
      socket.emit(
        'attemptJoin',
        { username: 'USERNAME1', room: 'NEWROOM' },
        (callback) => {
          expect(callback).toMatchObject(Error.noRoom);
        },
      );

      setTimeout(async () => {
        const room = await Room.findOne({ name: 'NEWROOM' });
        expect(room).not.toBeNull();
        expect(room.name).toEqual('NEWROOM');
        setTimeout(() => {
          done();
        }, TIMEOUT_DURATION);
      }, 500);
    });
  });
});
