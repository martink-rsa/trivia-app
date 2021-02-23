import React, { useState, useEffect } from 'react';
import * as S from './App.style';
import JoinGame from '../../views/JoinGame/JoinGame';
import { io } from 'socket.io-client';

const SERVER = 'http://localhost:3001';

let socket: any;

function App() {
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

  return (
    <>
      <JoinGame handleJoin={handleJoin} />
    </>
  );
}

export default App;
