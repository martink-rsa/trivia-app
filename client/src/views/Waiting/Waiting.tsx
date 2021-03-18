import * as S from './Waiting.style';

import ViewWrapper from '../../components/ViewWrapper/ViewWrapper';
import MainContainer from '../../components/MainContainer/MainContainer';
import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';

type Props = {
  playersInProgress: any[];
};

/** The Waiting screen that displays while the player is waiting for others
 * to finish
 */
function Waiting({ playersInProgress }: Props) {
  return (
    <ViewWrapper>
      <MainContainer>
        <h1>Waiting for players to finish...</h1>
        <S.PlayerList>
          {playersInProgress.map((player) => (
            <PlayerDisplay player={player} />
          ))}
        </S.PlayerList>
      </MainContainer>
    </ViewWrapper>
  );
}

export default Waiting;
