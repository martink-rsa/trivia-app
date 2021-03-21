import { useState, useEffect, FormEvent } from 'react';
import * as S from './Game.style';
import ReactMarkdown from 'react-markdown';

import Button from '../../components/Button/Button';
import Answer from '../../components/Answer/Answer';
import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';

import { convertMsToDisplayTime } from '../../utils/utils';
import { renderers } from '../../utils/syntaxHighlighter';

type Props = {
  question: any;
  submitAnswer: (index: any) => void;
};

/** The Game screen that displays the question the player
 * must answer to score a point
 */
function Game({ question, submitAnswer }: Props) {
  const [playerAnswer, setPlayerAnswer] = useState<null | string>(null);

  /** The countdown timer for the question in ms */
  const [countdown, setCountdown] = useState(0);

  /**
   * Submits the answer for the question
   * @param event The Form event
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    submitAnswer(playerAnswer);
  };

  /** Creates a timer each time a new question is received */
  useEffect(() => {
    // Reset the players selection
    setPlayerAnswer(null);

    let timer: ReturnType<typeof setInterval>;
    if (question) {
      setCountdown(question.questionDuration);
      timer = setInterval(() => {
        setCountdown((prevState) => {
          if (prevState === 0) {
            return prevState;
          }
          return prevState - 1000;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [question]);

  const addKeyIds = (array: any[]): any[] => {
    return array.map((item: any, index: number) => ({
      ...item,
      keyId: index,
    }));
  };

  console.log(addKeyIds(question.answers));

  return (
    <ViewWrapper>
      {/* {question.questionNumber} */}
      <S.Question>
        <ReactMarkdown
          renderers={renderers}
          children={question?.question?.text}
        />
      </S.Question>
      <form onSubmit={onSubmit}>
        <S.AnswersContainer>
          {question &&
            addKeyIds(
              question.answers,
            ).map((answer: { text: string; keyId: number }, index: number) => (
              <Answer
                key={answer.keyId}
                index={index}
                text={answer.text}
                isSelected={index.toString() === playerAnswer}
                setPlayerAnswer={setPlayerAnswer}
              />
            ))}
        </S.AnswersContainer>
        <S.Timer>{convertMsToDisplayTime(countdown)}</S.Timer>
        <Button
          disabled={!playerAnswer || countdown <= 0}
          type="submit"
          fullWidth
        >
          GO
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default Game;
