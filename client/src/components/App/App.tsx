import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Views
import JoinGame from '../../views/JoinGame/JoinGame';
import Lobby from '../../views/Lobby/Lobby';
import Game from '../../views/Game/Game';

import Player from '../../shared/Player';

const SERVER = 'http://localhost:3001';

let socket: any;

enum GameStates {
  'INTRO' = 'INTRO',
  'LOBBY' = 'LOBBY',
  'GAME' = 'GAME',
}

function App() {
  /** The state of the game that determines what view/screen to be showing */
  const [gameState, setGameState] = useState<GameStates>(GameStates.INTRO);

  /** A question that is sent from the backend and is used for the trivia */
  const [question, setQuestion] = useState({
    question: { text: 'JIT compiles JavaScript to executable __________' },
    answers: [
      { text: 'JavaScript' },
      { text: 'binary' },
      { text: 'bytecode' },
      { text: 'C++' },
    ],
  });

  /** Players that are in the room which is used to display a player list */
  const [players, setPlayers] = useState<Player[]>([
    { username: 'MICHAEL', iconId: 0, color: 'blue', isAdmin: false },
    { username: 'JIM', iconId: 1, color: 'green', isAdmin: false },
    { username: 'PAM', iconId: 2, color: 'purple', isAdmin: true },
    { username: 'DWIGHT', iconId: 3, color: 'red', isAdmin: false },
  ]);

  useEffect(() => {
    // All socket events are handled here instead of splitting them into each
    //    component otherwise it is hard to keep track of each of the events
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
    socket.on('roomMessage', (data: any) => {
      console.log(data);
    });
    socket.on('updateGameState', (data: GameStates) => {
      console.log(
        'Server emitted: updateGameState - Updating the state of the game',
        data,
      );
      handleGameState(data);
    });
    socket.on('updatePlayers', (data: any) => {
      console.log('Server emitted: updatePlayers - Updating player list');
      setPlayers(data);
    });
  }, []);

  /**
   * Used to trigger the game from the lobby
   * @param numberQuestions Number of questions for the trivia
   * @param subject The subject/scope of the questions e.g. javascript
   */
  const triggerGameStart = (numberQuestions: number, subject: string) => {
    console.log('Client emit: triggerGameStart - Attempt to start the game');
    socket.emit('gameStart', { numberQuestions, subject }, (callback: any) => {
      console.log('Callback: gameStart - ', callback);
    });
  };

  /**
   * Handles updating the game state, typically when emitted by the server
   * @param data
   */
  const handleGameState = (newGameState: any) => {
    console.log('handleGameState: Updating game state');
    setGameState(newGameState);
  };

  /**
   * Submits the player's answer to the server for the server to check
   * if correct
   * @param index
   */
  const submitAnswer = (index: any) => {
    console.log('Client emit: playerAnswer - Submitting an answer');
    socket.emit('playerAnswer', { index }, (callback: any) => {
      //
    });
  };

  /**
   * Attempts to have the player join a room which will only be allowed
   * if conditions are met e.g. name not taken
   * @param username
   * @param room
   */
  const attemptJoin = async (username: string, room: string) => {
    console.log(`Join attempt: ${username} -> ${room}`);
    socket.emit('attemptJoin', { username, room }, (callback: any) => {
      console.log('Callback: attemptJoin - ', callback);
    });
  };

  if (gameState === GameStates.INTRO) {
    return <JoinGame handleJoin={attemptJoin} />;
  } else if (gameState === GameStates.LOBBY) {
    return <Lobby players={players} onSubmit={triggerGameStart} />;
  } else if (gameState === GameStates.GAME) {
    return <Game question={question} submitAnswer={submitAnswer} />;
  } else {
    return <div>else returned</div>;
  }
}

export default App;
