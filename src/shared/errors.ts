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
  // NumberQuestions
  invalidTopicValue: {
    error: 'invalidTopicValue',
    info: 'The Topic is invalid, must be one of the available topics',
    field: 'selectedTopic',
  },
  // NumberQuestions
  invalidNumberQuestionsType: {
    error: 'invalidNumberQuestionsType',
    info: 'The Number Questions is invalid, must be an integer',
    field: 'numberQuestions',
  },
  invalidNumberQuestionsValue: {
    error: 'invalidNumberQuestionsValue',
    info: 'The Number Questions is not within the accepted constraints',
    field: 'numberQuestions',
  },
  // QuestionsDuration
  invalidQuestionsDurationType: {
    error: 'invalidQuestionsDurationType',
    info: 'The Questions Duration is invalid, must be an integer',
    field: 'questionsDuration',
  },
  invalidQuestionsDurationValue: {
    error: 'invalidQuestionsDurationValue',
    info: 'The Questions Duration is not within the accepted constraints',
    field: 'questionsDuration',
  },
  // Questions API
  questionsApiTopicsFailure: {
    error: 'questionsApiTopicsFailure',
    info: 'Unable to get the topics from the Questions API',
    field: '',
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
