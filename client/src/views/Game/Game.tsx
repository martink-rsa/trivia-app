import { FormEvent, useState } from 'react';
import * as S from './Game.style';

import Button from '../../components/Button/Button';
import Answer from '../../components/Answer/Answer';
import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';

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
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    submitAnswer(playerAnswer);
  };

  return (
    <ViewWrapper>
      <S.Question>
        {question.questionNumber}: {question?.question?.text}
      </S.Question>
      <form onSubmit={onSubmit}>
        <S.AnswersContainer>
          {question &&
            question.answers.map((answer: { text: string }, index: number) => (
              <Answer
                index={index}
                text={answer.text}
                isSelected={index.toString() === playerAnswer}
                setPlayerAnswer={setPlayerAnswer}
              />
            ))}
        </S.AnswersContainer>
        <S.Timer>00:00</S.Timer>
        <Button disabled={!playerAnswer} type="submit" fullWidth>
          GO
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default Game;
