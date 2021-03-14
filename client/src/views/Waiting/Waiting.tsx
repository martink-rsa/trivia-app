import React, { useState } from 'react';
import * as S from './Waiting.style';

type Props = {
  // question: any;
  // submitAnswer: (index: any) => void;
  playersInProgress: any[];
};

/** The Waiting screen that displays while the player is waiting for others
 * to finish
 */
function Waiting({ playersInProgress }: Props) {
  return (
    <S.Wrapper>
      Waiting for players to finish.
      <div>Players:</div>
      {console.log(playersInProgress)}
      {playersInProgress.length > 0 && <div>THERE ARE OTHER PLAYERS</div>}
      <div>
        {playersInProgress.map((player) => (
          <div>
            Player: {player.username} {console.log(player)}
          </div>
        ))}
      </div>
    </S.Wrapper>
  );
}

export default Waiting;
