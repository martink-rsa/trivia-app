import { useState, FormEvent, Dispatch, SetStateAction } from 'react';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import PlayerSelector from '../../components/PlayerSelector/PlayerSelector';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

import Logo from '../../assets/images/logo-white.png';

type Props = {
  handleJoin: (
    name: string,
    room: string,
    iconId: number,
    colorId: number,
  ) => void;
  iconId: number;
  setIconId: Dispatch<SetStateAction<number>>;
  colorId: number;
  setColorId: Dispatch<SetStateAction<number>>;
};

// Temporary functions to quickly get random usernames
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
// ---- End Temporary Functions

function JoinGame({
  handleJoin,
  iconId,
  setIconId,
  colorId,
  setColorId,
}: Props) {
  /** The name of the player */
  const [playerName, setPlayerName] = useState(generateName());

  /** The room the player will join */
  const [room, setRoom] = useState(generateName());

  /**
   * Validates and sets the players name from an HTML input.
   * @param event The Input element event
   */
  const changePlayerName = (event: FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget as HTMLInputElement;
    if (value.match(/^[A-Za-z0-9]+$/)) {
      setPlayerName(value);
    }
    if (value === '') {
      setPlayerName('');
    }
  };

  /**
   * Validates and sets the room to play in from an HTML input.
   * @param event The Input element event
   */
  const changeRoom = (event: FormEvent<HTMLInputElement>): void => {
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleJoin(playerName, room, iconId, colorId);
  };

  return (
    <ViewWrapper backgroundColor="primary">
      <MainContainer>
        <img src={Logo} alt="Trivia App Logo" />
      </MainContainer>
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
        <PlayerSelector
          iconId={iconId}
          setIconId={setIconId}
          colorId={colorId}
          setColorId={setColorId}
        />
        <Button type="submit" invert fullWidth>
          JOIN
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default JoinGame;
