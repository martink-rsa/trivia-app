import React, { useState } from 'react';
import * as S from './Game.style';

import Button from '../../components/Button/Button';
import Answer from '../../components/Answer/Answer';

/* enum AnswerType {
  'NORMAL' = 'NORMAL',
  'MULTIPLE_CHOICE' = 'MULTIPLE_CHOICE',
  'TRUE_FALSE' = 'TRUE_FALSE',
}

type Answer = {
  text: string;
  type: AnswerType;
};

type Question = {
  question: string;
  answers: Answer[];
}; */

type Props = {
  question: any;
  submitAnswer: (index: any) => void;
};

/** The Game screen that displays the question the player
 * must answer to score a point
 */
function Game({ question, submitAnswer }: Props) {
  const [playerAnswer, setPlayerAnswer] = useState<null | string>(null);

  /**
   * Submits the answer for the question
   * @param event The Form event
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    //
    event.preventDefault();
    submitAnswer(playerAnswer);
  };

  return (
    <S.Wrapper>
      <S.Question>{question.question.text}</S.Question>
      <form onSubmit={onSubmit}>
        <S.AnswersContainer>
          {question.answers.map((answer: { text: string }, index: number) => (
            <Answer
              index={index}
              text={answer.text}
              isSelected={index.toString() === playerAnswer}
              setPlayerAnswer={setPlayerAnswer}
            />
          ))}
        </S.AnswersContainer>
        <S.Timer>00:00</S.Timer>
        <Button type="submit" fullWidth>
          START
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default Game;
