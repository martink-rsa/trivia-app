const mongoose = require('mongoose');
const mongodb = require('mongodb');
require('../app');
const { setupDatabase } = require('./fixtures/db');

const Room = require('../models/room');
const User = require('../models/user');

const { addUser, getUserFromName, getAllUsers } = require('../utils/user');

const { user0, user1, user2 } = require('./fixtures/users');

beforeEach(setupDatabase);

describe('Users', () => {
  describe('Adding', () => {
    it('should create a new user', async () => {
      await addUser(user0);
      const user = await getUserFromName(user0.username);
      expect(user).toMatchObject(user0);
    });
    it('should not create a new user if username exists', async () => {
      let error;
      try {
        const test0 = await addUser(user0);
        const test = await addUser(user0);
        console.log('TEST:');
        console.log(test0);
        console.log(test);
      } catch (err) {
        error = err;
      }
      console.log(error);
      // expect(error).toBeInstanceOf(mongodb.Error);
      const users = await getAllUsers();
      expect(users.length).toBe(4);
      // expect(error).toBeInstanceOf(mongoose.Error.ValidationError
    });
  });
  describe('Get/find', () => {
    it('should find the correct user', async () => {
      await addUser(user0);
      const user = await getUserFromName(user0.username);
      expect(user).toMatchObject(user0);
    });
    it('should return null if no user exists', async () => {
      const user = await getUserFromName(user0.username);
      expect(user).toBeNull();
    });
  });
});
