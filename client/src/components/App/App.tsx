import React, { useState, useEffect } from 'react';
import * as S from './App.style';
import JoinGame from '../../views/JoinGame/JoinGame';
import Lobby from '../../views/Lobby/Lobby';
import Player from '../../shared/Player';
import { io } from 'socket.io-client';

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
    socket.on('updatePlayers', (players: any) => {
      setPlayers(players);
    });
  }, []);

  const attemptJoin = async (username: string, room: string) => {
    console.log(username);
    console.log(room);
  };

  const getGameScreen = () => {
    if (gameState === GameStates.INTRO) {
      return <JoinGame handleJoin={attemptJoin} />;
    } else if (gameState === GameStates.LOBBY) {
      return <Lobby players={players} />;
    }
  };

  return <>{getGameScreen()}</>;
}

export default App;
