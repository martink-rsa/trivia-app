import React, { useState, useEffect } from 'react';
import * as S from './App.style';
import JoinGame from '../../views/JoinGame/JoinGame';
import Lobby from '../../views/Lobby/Lobby';
import Player from '../../shared/Player';
import { io } from 'socket.io-client';
import axios from 'axios';

const SERVER = 'http://localhost:3001';

let socket: any;

enum GameStates {
  'INTRO',
  'LOBBY',
}

function App() {
  const [gameState, setGameState] = useState<GameStates>(GameStates.LOBBY);

  const [players, setPlayers] = useState<Player[]>([
    { username: 'MICHAEL', iconId: 0, color: 'blue', isAdmin: false },
    { username: 'JIM', iconId: 1, color: 'green', isAdmin: false },
    { username: 'PAM', iconId: 2, color: 'purple', isAdmin: true },
    { username: 'DWIGHT', iconId: 3, color: 'red', isAdmin: false },
  ]);

  useEffect(() => {
    //
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
    socket.on('roomMessage', (data: any) => {
      console.log(data);
    });
    socket.on('updateGameState', (data: any) => {
      console.log('changing game state');
      setGameState(data);
    });
  }, []);

  const getGameScreen = () => {
    if (gameState === GameStates.INTRO) {
      return <JoinGame handleJoin={attemptJoin} />;
    } else if (gameState === GameStates.LOBBY) {
      return <Lobby players={players} />;
    }
  };

  const attemptJoin = async (username: string, room: string) => {
    console.log(username);
    console.log(room);
    socket.emit('attemptJoin', { username, room }, (message: any) => {
      console.log('CALLBACK');
      console.log(message);
    });

    /* const res = await axios.post('http://localhost:3001/', {
      username,
      room,
    });
    console.log(res);
    if (res.status === 200) {
      // setupServerConnection();
      // setGameState(GameStates.LOBBY);
    } */
  };

  /* const setupServerConnection = () => {
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
  }; */

  return <>{getGameScreen()}</>;
}

export default App;
