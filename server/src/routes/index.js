const express = require('express');
const router = express.Router();
const { addUser } = require('../utils/user');
const User = require('../models/user');

router.post('/', async (req, res, next) => {
  try {
    const { username, room } = req.body;
    if (!username) {
      return next({
        message: 'No username has been supplied',
        field: 'username',
      });
    }
    if (!room) {
      return next({ message: 'No room has been supplied', field: 'room' });
    }
    const user = { username, room, iconId: 0, color: 'red' };
    await addUser(user);
    // Success at this point, add user to server.
    res.status(200).send({ message: 'User has joined' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
