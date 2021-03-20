import { useState, ChangeEvent, FormEvent } from 'react';
import * as S from './Lobby.style';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import Button from '../../components/Button/Button';
import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';
import Player from '../../shared/Player';

type Props = {
  players: Player[];
  topics: any;
  onSubmit: (numberQuestions: number, subject: string) => void;
};

/** The Lobby screen that shows all the players and leads
 * to the main game
 */
function Lobby({ players, topics, onSubmit }: Props) {
  const [topicSelected, setTopicSelected] = useState(topics[0].id);
  const [numQuestions, setNumQuestions] = useState(3);

  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(numQuestions, topicSelected);
  };

  /**
   * Changes the number of questions for the Trivia
   * @param event Mouse event on the element
   */
  const changeNumQuestions = (event: ChangeEvent<HTMLInputElement>) => {
    setNumQuestions(parseInt(event.currentTarget.value, 10));
  };

  /**
   * Changes the topic selected for the Trivia
   * @param event Mouse event on the element
   */
  const changeTopics = (event: any) => {
    setTopicSelected(event.currentTarget.value);
  };

  return (
    <ViewWrapper>
      <MainContainer>
        <S.PlayersList>
          {players.map((player) => (
            <PlayerDisplay key={player.username} player={player} />
          ))}
        </S.PlayersList>
      </MainContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numQuestions">Questions:</label>
          <S.Input
            type="number"
            id="numQuestions"
            min="1"
            max="50"
            value={numQuestions}
            onChange={changeNumQuestions}
          />
        </div>
        <S.Select onChange={changeTopics}>
          {topics.map((topic: any) => (
            <option
              key={topic.id}
              value={topic.id}
              selected={topic.id === topicSelected}
            >
              {topic.title}
            </option>
          ))}
        </S.Select>
        <Button type="submit" fullWidth>
          START
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default Lobby;
