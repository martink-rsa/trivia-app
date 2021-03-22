import * as S from './Answer.style';
import ReactMarkdown from 'react-markdown';
import { renderers } from '../../utils/syntaxHighlighter';

type Props = {
  index: number;
  text: string;
  isSelected: boolean;
  setPlayerAnswer: (index: string) => void;
};

/** The Answer component that is used when a user is selecting an
 * answer in the trivia
 */
function Answer({ index, text, isSelected, setPlayerAnswer }: Props) {
  const handleChoice = (event: any) => {
    const choice = event.target.value;
    console.log('handleChoice', choice);
    setPlayerAnswer(choice);
  };

  return (
    <S.Wrapper>
      <S.Input
        type="radio"
        id={`trivia-answer-${index}`}
        name="trivia-answer"
        value={index}
        onChange={handleChoice}
      />
      <S.Label htmlFor={`trivia-answer-${index}`} isSelected={isSelected}>
        <S.Content>
          <S.Number>{index + 1}</S.Number>
          <ReactMarkdown renderers={renderers} children={text} />
        </S.Content>
      </S.Label>
    </S.Wrapper>
  );
}

export default Answer;
