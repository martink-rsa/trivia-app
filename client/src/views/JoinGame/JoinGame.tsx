import React from 'react';
import * as S from './JoinGame.style';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

function JoinGame() {
  function handleClick() {
    console.log('Click');
  }
  return (
    <S.Wrapper>
      <form>
        <Input label="Name" />
        <Input label="Room" />
        <button>Test</button>
        <Button onClick={handleClick} invert fullWidth>
          JOIN
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default JoinGame;
