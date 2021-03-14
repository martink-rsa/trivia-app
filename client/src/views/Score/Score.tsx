import React, { useState } from 'react';
import * as S from './Score.style';

type Props = {
  score: any[];
};

const dummyData = [
  {
    _id: '604f74c0137e435beafac6d0',
    username: 'ZOVENFFTZWGWDJFHN',
    answers: [
      { question: 0, correctAnswer: 2, playersAnswer: 3 },
      { question: 1, correctAnswer: 2, playersAnswer: 2 },
      { question: 2, correctAnswer: 2, playersAnswer: 3 },
      { question: 3, correctAnswer: 2, playersAnswer: 3 },
      { question: 4, correctAnswer: 1, playersAnswer: 3 },
    ],
  },
  {
    _id: '604f74c0137e435beafac6ds',
    username: 'Bob',
    answers: [
      { question: 0, correctAnswer: 2, playersAnswer: 2 },
      { question: 1, correctAnswer: 2, playersAnswer: 2 },
      { question: 2, correctAnswer: 2, playersAnswer: 2 },
      { question: 3, correctAnswer: 2, playersAnswer: 2 },
      { question: 4, correctAnswer: 1, playersAnswer: 1 },
    ],
  },
];

/** The Score screen that displays at the end of a game and shows
 * all of the player's scores
 */
function Score({ score }: Props) {
  console.log(JSON.stringify(score));
  score = dummyData;

  const parseScores = (scores: any) => {
    //
  };

  const getScores = () => {
    return <div>Test</div>;
  };

  parseScores(dummyData);

  return (
    <S.Wrapper>
      Score screen
      <div>
        {score.map((player) => (
          <div>Player{player.username}</div>
        ))}
      </div>
    </S.Wrapper>
  );
}

export default Score;
