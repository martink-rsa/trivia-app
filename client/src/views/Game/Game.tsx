import { useState, useEffect, FormEvent } from 'react';
import * as S from './Game.style';
import ReactMarkdown from 'react-markdown';

import Button from '../../components/Button/Button';
import Answer from '../../components/Answer/Answer';
import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const renderers = {
  code: ({ language, value }: { language: any; value: any }) => {
    return (
      <SyntaxHighlighter
        style={materialLight}
        language={language}
        children={value}
      />
    );
  },
};

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

  /**
   * Adds a leading 0 to a single integer if less than 10
   * @param {number} value An integer value
   * @returns {string} String with leading 0 added
   * @example
   * addLeadingZero(5);
   * // returns "05"
   */
  const addLeadingZero = (value: number): string =>
    value < 10 ? `0${value}` : value.toString();

  /**
   * Converts a millisecond value to a display time
   * @param {number} timeInMs Time value in milliseconds
   * @returns {string} .....
   * @example
   * convertMsToDisplayTime(5000);
   * // returns "00:05"
   */
  const convertMsToDisplayTime = (timeInMs: number): string => {
    const seconds = Math.floor(timeInMs / 1000) % 60;
    const minutes = Math.floor(timeInMs / (1000 * 60)) % 60;
    return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
  };

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
            question.answers.map((answer: { text: string }, index: number) => (
              <Answer
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
