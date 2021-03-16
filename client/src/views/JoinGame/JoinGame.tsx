import React, { useState } from 'react';
import * as S from './JoinGame.style';

import PlayerSelector from '../../components/PlayerSelector/PlayerSelector';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import Logo from '../../assets/images/logo-white.png';

type Props = {
  handleJoin: (name: string, room: string) => void;
};

const generateRandomNumber = (min = 1, max = 20) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Math.floor(Math.random() * (max - min + 1) + min);

const generateName = () => {
  // 65 - 90
  let name = '';
  const numLetters = generateRandomNumber(15, 20);
  for (let i = 0; i < numLetters; i += 1) {
    const letter = generateRandomNumber(65, 90);
    name += String.fromCharCode(letter);
  }
  return name;
};

function JoinGame(props: Props) {
  const { handleJoin } = props;

  /** The name of the player */
  const [playerName, setPlayerName] = useState(generateName());

  /** The room the player will join */
  const [room, setRoom] = useState(generateName());

  /**
   * Validates and sets the players name from an HTML input.
   * @param event The Input element event
   */
  const changePlayerName = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget as HTMLInputElement;
    /* if (value.match(/^[A-Za-z0-9]+$/)) {
      setPlayerName(value);
    }
    if (value === '') {
      setPlayerName('');
    } */
    setPlayerName(value);
  };

  /**
   * Validates and sets the room to play in from an HTML input.
   * @param event The Input element event
   */
  const changeRoom = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget as HTMLInputElement;
    const _value = value.toUpperCase();
    if (_value.match(/^[A-Za-z0-9]+$/)) {
      setRoom(_value);
    }
  };

  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleJoin(playerName, room);
  };

  return (
    <S.Wrapper>
      <img src={Logo} alt="Trivia App Logo" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          id="name"
          required
          onChange={changePlayerName}
          value={playerName}
        />
        <Input
          label="Room"
          name="room"
          id="room"
          required
          onChange={changeRoom}
          value={room}
        />
        <PlayerSelector />
        <Button type="submit" invert fullWidth>
          JOIN
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default JoinGame;
