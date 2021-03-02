const app = require('../app');
const io = require('socket.io-client');
// const ioClient = require('socket.io-client');
// const ioBE = require('socket.io');
// const http = require('http');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

const SERVER = 'http://localhost:3001';

describe('socket.io', () => {
  it('should run a basic test', () => {
    socket = io(SERVER);
    expect(1).toBe(1);
  });
});
