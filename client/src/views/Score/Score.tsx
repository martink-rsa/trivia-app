import { FormEvent } from 'react';
import * as S from './Score.style';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import PlayerIcons from '../../components/PlayerIcons/PlayerIcons';
import Button from '../../components/Button/Button';
import playerColors from '../../shared/playerColors';

type Props = {
  scores: any[];
  onSubmit: () => void;
};

/** The Score screen that displays at the end of a game and shows
 * all of the player's scores
 */
function Score({ scores, onSubmit }: Props) {
  /**
   * Parses a list of players with scores and then calculates their total answers
   * correct as well as their total score
   * @param _scores An array of players with their scores
   */
  const parseScores = (_scores: any) =>
    _scores
      .map((player: any) => {
        const answersCorrect = player.answers.reduce(
          (totalAnswersCorrect: number, item: any) => {
            if (item.playersAnswer === item.correctAnswer) {
              totalAnswersCorrect += 1;
            }
            return totalAnswersCorrect;
          },
          0,
        );
        player.answersCorrect = answersCorrect;
        return player;
      })
      .sort((a: any, b: any): any => b.answersCorrect - a.answersCorrect);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <ViewWrapper>
      <MainContainer fullWidth>
        <h1>Score</h1>
        <S.Table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Correct</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {parseScores(scores).map((player: any, index: any) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>
                  <PlayerIcons
                    id={player.iconId}
                    color={playerColors[player.colorId]}
                    size={30}
                  />
                </td>
                <td>{player.username}</td>
                <td>{player.answersCorrect}</td>
                <td>{Math.floor(Math.random() * 10)}</td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </MainContainer>
      <form onSubmit={handleSubmit}>
        <Button type="submit" fullWidth>
          MAIN MENU
        </Button>
      </form>
    </ViewWrapper>
  );
}

export default Score;
