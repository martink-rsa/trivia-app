import React, { useState, useEffect } from 'react';
import * as S from './App.style';
import JoinGame from '../../views/JoinGame/JoinGame';
import { io } from 'socket.io-client';
import axios from 'axios';

const SERVER = 'http://localhost:3001';

let socket: any;

enum GameStates {
  'INTRO',
  'LOBBY',
}

function App() {
  const [gameState, setGameState] = useState<GameStates>(GameStates.INTRO);

  useEffect(() => {
    //
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
  }, []);

  function handleJoin(name: string, room: string) {
    console.log('Handle join');
    socket.emit('attemptJoin', { name, room });
  }

  const attemptJoin = async (username: string, room: string) => {
    console.log(username);
    console.log(room);
    const res = await axios.post('http://localhost:3001/', {
      username,
      room,
    });
    console.log(res);
    if (res.status === 200) {
      // setupServerConnection();
      // setGameState(GameStates.LOBBY);
    }
  };

  /* const setupServerConnection = () => {
    socket = io(SERVER);
    socket.on('userConnected', (data: any) => {
      console.log(data);
    });
  }; */

  const getGameScreen = () => {
    if (gameState === GameStates.INTRO) {
      return <JoinGame handleJoin={attemptJoin} />;
    } else if (gameState === GameStates.LOBBY) {
      return <div>LOBBY</div>;
    }
  };

  return <>{getGameScreen()}</>;
}

export default App;
