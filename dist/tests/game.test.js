"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = require("../models/room.model");
const utils_1 = require("../utils/utils");
const clientIo = require('socket.io-client');
const { setupDatabase, mockRooms, mockUsers } = require('./fixtures/db');
const { server } = require('../index');
const Errors = require('../shared/errors');
let socket;
let game;
// Currently have to add a setTimeout in each of the tests to prevent
// the socket from disconnecting. This unfortunately adds a delay to
// each of the tests. If the duration is too low, it will cause errors.
const TIMEOUT_DURATION = 350;
beforeEach(async () => {
    setupDatabase();
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
describe('Game', () => {
    it('should get the correct player shape', (done) => {
        socket.emit('attemptJoin', { username: 'USERNAME1', room: 'NEWROOM' });
        setTimeout(async () => {
            socket.emit('attemptJoin', { username: 'USERNAME2', room: 'NEWROOM' });
        }, 200);
        setTimeout(async () => {
            const room = await room_model_1.Room.findOne({ name: 'NEWROOM' });
            const questions = utils_1.getRandomQuestions('javascript', 5);
            // To do: Add the correct game object
            // game = new Game({numQuestions: 10, players: ''});
            // game = new Game('NEWROOM', questions, 'javascript', 5, room.users);
            // game.startGame();
            // const player = game.getPlayers()[0];
            // console.log('TEST PLAYER');
            // console.log(player);
            // expect({}.hasOwnProperty.call(player, '_id')).toBe(true);
            // expect({}.hasOwnProperty.call(player, 'timer')).toBe(true);
            // expect({}.hasOwnProperty.call(player, 'currentQuestion')).toBe(true);
            // expect(player.currentQuestion).toBe(0);
            // expect.assertions(4);
            setTimeout(() => {
                done();
            }, 4200);
        }, 500);
    });
    // Initial test that is working
    /* it('should get the correct player shape', (done) => {
      socket.emit('attemptJoin', { username: 'USERNAME1', room: 'NEWROOM' });
      setTimeout(async () => {
        const room = await Room.findOne({ name: 'NEWROOM' });
        expect(room).not.toBeNull();
        expect(room.name).toEqual('NEWROOM');
        // expect.assertions(3);
  
        const questions = getRandomQuestions('javascript', 5);
  
        game = new Game('NEWROOM', questions, 'javascript', 5, room.users);
        game.startGame();
        const player = game.getPlayers()[0];
        expect({}.hasOwnProperty.call(player, '_id')).toBe(true);
        expect({}.hasOwnProperty.call(player, 'timer')).toBe(true);
        expect({}.hasOwnProperty.call(player, 'currentQuestion')).toBe(true);
        expect(player.currentQuestion).toBe(0);
        setTimeout(() => {
          done();
        }, TIMEOUT_DURATION);
      }, 500);
    }); */
});
//# sourceMappingURL=game.test.js.map