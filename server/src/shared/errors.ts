const Errors = {
  // Username
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
  usernameUnavailable: {
    error: 'usernameUnavailable',
    info: 'Username is unavailable',
    field: 'username',
  },
  unknownErrorUsername: {
    error: 'unknownError',
    info: 'Unknown error',
    field: 'username',
  },
  // Room
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
  // IconId
  invalidIconIdType: {
    error: 'invalidIconIdType',
    info: 'The Icon Id is invalid, must be an integer',
    field: 'iconId',
  },
  invalidIconIdValue: {
    error: 'invalidIconIdValue',
    info: 'The Icon Id is not within the accepted constraints',
    field: 'iconId',
  },
  // ColorId
  invalidColorIdType: {
    error: 'invalidColorIdType',
    info: 'The Color Id is invalid, must be an integer',
    field: 'colorId',
  },
  invalidColorIdValue: {
    error: 'invalidColorIdValue',
    info: 'The Color Id is not within the accepted constraints',
    field: 'colorId',
  },
  // Generic
  unknownError: {
    error: 'unknownError',
    info: 'Unknown error',
    field: '',
  },

  incorrectUserStartGame: {
    error: 'incorrectUserStartGame',
    info: 'Incorrect user has attempted to start the game',
    field: '',
  },
};

export default Errors;
