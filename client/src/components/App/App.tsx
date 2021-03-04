import React, { useState, useEffect } from "react";
import * as S from "./App.style";
import JoinGame from "../../views/JoinGame/JoinGame";
import Lobby from "../../views/Lobby/Lobby";
import { io } from "socket.io-client";

const SERVER = "http://localhost:3001";

let socket: any;

enum GameStates {
  "INTRO",
  "LOBBY",
}

function App() {
  const [gameState, setGameState] = useState<GameStates>(GameStates.LOBBY);

  useEffect(() => {
    //
    socket = io(SERVER);
    socket.on("userConnected", (data: any) => {
      console.log(data);
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
      return <Lobby />;
    }
  };

  return <>{getGameScreen()}</>;
}

export default App;
