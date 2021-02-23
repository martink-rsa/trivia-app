import React from 'react';
import * as S from './JoinGame.style';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Logo from '../../assets/images/logo-white.png';

function JoinGame() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Submit');
  };

  return (
    <S.Wrapper>
      <img src={Logo} alt="Trivia App Logo" />
      <form onSubmit={handleSubmit}>
        <Input label="Name" required />
        <Input label="Room" required />
        <Button type="submit" invert fullWidth>
          JOIN
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default JoinGame;
