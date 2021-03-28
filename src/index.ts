import { Server, Socket } from 'socket.io';
import validator from 'validator';
import * as http from 'http';

import app from './app';
import log from './utils/log';

import Errors from './shared/errors';

import { User, IUser } from './models/user.model';
import { Room, IRoom } from './models/room.model';

import Game from './utils/game';

import Topics from './utils/topicsController';

import { getRandomQuestions } from './utils/utils';

const PORT = process.env.PORT;
// const QUESTIONS_SERVER_URL = process.env.QUESTIONS_SERVER_URL;

type Games = {
  [key: string]: Game;
};

const games: Games = {};

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const serverIo = new Server(server, {
  cors: {
    origin: '*',
  },
});

serverIo.on('connection', (socket: Socket) => {
  console.log('Server: + Connected ID:', socket.id);
  socket.emit('userConnected', 'You have connected');

  socket.on('serverTest', (message: any) => {
    console.log(message);
  });

  // When a user attempts to join the game
  // eslint-disable-next-line consistent-return
  socket.on(
    'attemptJoin',
    async ({ username = '', room = '', iconId = 0, colorId = 0 }, callback: any) => {
      // Steps:
      // 1. User clicks join
      // 2. Check that the username is valid
      // 2.1 Username is not empty
      // 2.2 Username is only alphanumeric
      // 2.2 Room is not empty
      // 3. Check username is taken or not

      // Validation: Username
      const usernameNotValid = !validator.isAlphanumeric(username);
      if (!username) {
        return callback(Errors.noUsername);
      }
      if (usernameNotValid) {
        return callback(Errors.invalidUsername);
      }

      // Validation: Room
      const roomNotValid = !validator.isAlphanumeric(room);
      if (!room) {
        return callback(Errors.noRoom);
      }
      if (roomNotValid) {
        return callback(Errors.invalidRoom);
      }

      // Validation: Icon ID
      const ICON_COUNT = 9;
      const iconIdNotValid = !validator.isInt(iconId.toString());
      if (iconIdNotValid) {
        return callback(Errors.invalidIconIdType);
      }
      if (iconId < 0 || iconId > ICON_COUNT - 1) {
        return callback(Errors.invalidIconIdValue);
      }

      // Validation: Icon ID
      const COLOR_COUNT = 6;
      const colorIdNotValid = !validator.isInt(colorId.toString());
      if (colorIdNotValid) {
        return callback(Errors.invalidColorIdType);
      }
      if (colorId < 0 || colorId > COLOR_COUNT - 1) {
        return callback(Errors.invalidColorIdValue);
      }

      // Adding the user
      let newUser: any;
      try {
        const user = new User({
          username,
          room,
          iconId,
          colorId,
          socketId: socket.id,
          isAdmin: false,
        });
        newUser = await user.save();
      } catch (error) {
        if (error.code && error.code === 11000) {
          return callback(Errors.usernameUnavailable);
        }
        return callback(Errors.unknownErrorUsername);
      }

      // Logging user
      console.log('====================================');
      log.success(`User Added: ${newUser.username} -> ${room}`);
      console.log('------------------------------------');
      Object.keys(newUser._doc).forEach((field) =>
        console.log(`◦ ${field}: ${newUser._doc[field]}`)
      );
      console.log('====================================');

      // Joining a room
      // 1. Check room exists
      // 1.1 If room exists, add user to room
      // 1.2 If room doesn't exist, create room with user as admin
      try {
        const foundRoom = await Room.findOne({ name: room });
        // foundRoom = await Room.findOne({ name: room });
        if (foundRoom) {
          // Joining an existing room
          log.info('Room exists');
          if (!foundRoom.users.includes(newUser._id)) {
            foundRoom.users.push(newUser._id);
            await foundRoom.save();
            log.info('User added to existing MongoDB room');
          } else {
            log.error('User is already added to room');
            // eslint-disable-next-line node/no-callback-literal
            return callback({
              error: 'serverError',
              info: 'User is already added to the room',
              field: '',
            });
          }
        } else {
          // Creating a new room
          log.info('Room does not exist');
          const newRoom = new Room({
            name: room,
            admin: newUser._id,
            users: [newUser._id],
            topic: 'Programming',
          });
          await newRoom.save();
          log.info('User created room');
          newUser.isAdmin = true;
          await newUser.save();
          log.info('User made admin of new room');
        }
      } catch (error) {
        console.log(error);
      }

      // Socket.io add user to room
      try {
        socket.join(room);
        serverIo.to(room).emit('roomMessage', 'Hello user, welcome to the room');
        log.info('User added to socket.io room');
      } catch (error) {
        // eslint-disable-next-line node/no-callback-literal
        return callback({
          error: 'unknownError',
          info: 'Unknown error when adding user to Socket.io room',
          field: '',
        });
      }

      const topics = Topics.getOnlyTopics();

      socket.emit('updateTopics', topics);
      // Updating game state for user
      socket.emit('updateGameState', 'LOBBY');

      // Get the players in the room
      const currentRoom: IRoom | null = await Room.findOne({ name: room })
        .populate('users')
        .exec();

      if (currentRoom) {
        const { users } = currentRoom;

        // Adding 'isAdmin' flag
        const updatedUsers = users.map((user: any) => ({
          username: user.username,
          iconId: user.iconId,
          colorId: user.colorId,
          socketId: user.socketId,
          isAdmin: user._id.toString() === currentRoom.admin.toString(),
        }));

        serverIo.to(room).emit('updatePlayers', updatedUsers);
        const successMessage = {
          status: 200,
        };
        callback(successMessage);
      }
    }
  );

  socket.on('gameStart', async (data: any, callback: any) => {
    // * Only want admin to trigger the game starting
    // * Get the correct socketId admin id from the User model
    // * Check if the parameter is the same as the admin id
    // Trying to avoid passing in parameters so that people can't
    //    pass in fake/forged values e.g. they pass in a room that they are
    //    not part of.
    // We fetch the user using the socket.io id, then fetch the room based on
    //    this user.
    // The fetched room is what is used as the emit room target, otherwise we'd
    //    have to resort to a room name being passed as a param
    log.info('gameStart event');

    const { selectedTopic, numberQuestions, questionsDuration } = data;
    log.info(
      'Topic:',
      selectedTopic,
      'questions:',
      numberQuestions,
      'duration:',
      questionsDuration
    );

    // Validation: Topics
    const topics = Topics.getOnlyTopics();
    const isTopic = topics.reduce((foundTopic, topic) => {
      if (topic.id === selectedTopic) {
        foundTopic = true;
      }
      return foundTopic;
    }, false);
    if (!isTopic) {
      return callback(Errors.invalidTopicValue);
    }

    // Validation: Number of questions
    const numberQuestionsInvalidType = typeof numberQuestions !== 'number';
    if (numberQuestionsInvalidType) {
      return callback(Errors.invalidNumberQuestionsType);
    }
    if (numberQuestions <= 0 || numberQuestions >= 99) {
      return callback(Errors.invalidNumberQuestionsValue);
    }

    // Validation: Questions duration
    const questionsDurationInvalidType = typeof questionsDuration !== 'number';
    if (questionsDurationInvalidType) {
      return callback(Errors.invalidQuestionsDurationType);
    }
    if (questionsDuration <= 0 || questionsDuration >= 21) {
      return callback(Errors.invalidQuestionsDurationValue);
    }

    try {
      // Get the user using socket.io id
      const user = await User.findOne({ socketId: socket.id });
      if (!user) {
        return callback(Errors.incorrectUserStartGame);
      }

      // Find the room the player is in. This is needed to check the player
      // is admin, but also later to emit to this room
      const room = await Room.findOne({ users: user }).populate('users');
      if (!room) {
        return callback(Errors.incorrectUserStartGame);
      }

      // See if player's id matches the admin id
      if (user._id.toString() === room.admin.toString()) {
        log.info('Game starting', room.name, selectedTopic, numberQuestions);
        const questions = getRandomQuestions(selectedTopic, numberQuestions);

        const users = [...room.users];

        const config = {
          roomId: room._id,
          roomName: room.name,
          questions: questions,
          topic: selectedTopic,
          numQuestions: 5,
          players: users,
          questionDuration: questionsDuration * 1000,
        };

        const game = new Game(config);

        room.game = game;

        games[room._id] = game;
        await room.save();

        room.game.startGame();

        serverIo.to(room.name).emit('updateGameState', 'GAME');
      } else {
        callback(Errors.incorrectUserStartGame);
      }
    } catch (error) {
      callback(Errors.incorrectUserStartGame);
    }
  });

  socket.on('playerAnswer', async (data: any, callback: any) => {
    const user = await User.findOne({ socketId: socket.id });
    if (user) {
      const room = await Room.findOne({ users: user });
      const { index } = data;
      if (room) {
        games[room._id].handleAnswer(parseInt(index), user._id);
      }
    }
  });

  socket.on('backToJoinGame', async () => {
    serverIo.emit('updateGameState', 'JOIN');
  });

  socket.on('testMessage', async () => {
    console.log('Server: Test message received');
  });
  /** User has disconnected from websocket */
  socket.on('disconnect', async () => {
    // 1. Delete player from room
    // 1. If player was admin, assign new admin
    // 2. Update room player list
    // 4. If no players left, delete MongoDB room and sockets.io room

    console.log('Server: - Disconnected ID:', socket.id);
    const user = await User.findOne({ socketId: socket.id });

    if (user) {
      user.deleteOne();
    }
  });

  // This adapter will automatically be called with the 'on' events
  // I found this in the documentation and it could be extremely useful
  /*
  https://socket.io/docs/v3/rooms/#Disconnection
  Starting with socket.io@3.1.0, the underlying Adapter will emit the following events:

    create-room (argument: room)
    delete-room (argument: room)
    join-room (argument: room, id)
    leave-room (argument: room, id)
  */
  serverIo.of('/').adapter.on('join-room', (room: any, id: any) => {
    // console.log(`socket ${id} has joined room ${room}`);
  });
});

export { serverIo, server, games };
