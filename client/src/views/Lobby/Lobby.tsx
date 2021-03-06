import React, { useState, useEffect } from 'react';
import * as S from './Lobby.style';
import Button from '../../components/Button/Button';
import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';
import Player from '../../shared/Player';

type Props = {
  players: Player[];
};

/** The Lobby screen that shows all the players and leads
 * to the main game
 */
function Lobby({ players }: Props) {
  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    //
  };

  return (
    <S.Wrapper>
      <S.MainContainer>
        <S.PlayersList>
          {players.map((player) => (
            <PlayerDisplay player={player} />
          ))}
        </S.PlayersList>
      </S.MainContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numQuestions">Questions:</label>
          <S.Input
            type="number"
            id="numQuestions"
            min="1"
            max="99"
            value="20"
          />
        </div>
        <S.Select>
          <option>Test</option>
        </S.Select>
        <Button type="submit" fullWidth>
          START
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default Lobby;
