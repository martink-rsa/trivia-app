const Error = {
  noUsername: {
    error: 'syntaxError',
    info: 'No username has been provided',
    field: 'username',
  },
  invalidUsername: {
    error: 'syntaxError',
    info: 'Username is invalid',
    field: 'username',
  },
  noRoom: {
    error: 'syntaxError',
    info: 'No room has been provided',
    field: 'room',
  },
  invalidRoom: {
    error: 'syntaxError',
    info: 'Room name is invalid',
    field: 'room',
  },
  usernameUnavailable: {
    error: 'usernameUnavailable',
    info: 'Username is unavailable',
    field: 'username',
  },
  unknownError: {
    error: 'unknownError',
    info: 'Unknown error',
    field: '',
  },
  unknownErrorUsername: {
    error: 'unknownError',
    info: 'Unknown error',
    field: 'username',
  },
};

module.exports = Error;
