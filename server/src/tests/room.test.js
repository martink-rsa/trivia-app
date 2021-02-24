require('../app');
const { setupDatabase } = require('./fixtures/db');

const Room = require('../models/room');
const User = require('../models/user');

const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
  removeAllUsers,
} = require('../utils/user');

const { user0, user1, user2 } = require('./fixtures/users');

beforeEach(setupDatabase);

describe('Creating a room', () => {
  it('should create a new room', async () => {
    expect(1).toBe(2);
  });
});
