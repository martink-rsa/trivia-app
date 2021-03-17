import * as S from './PlayerDisplay.style';
import Player from '../../shared/Player';

import Icons from '../../shared/Icons';

type Props = {
  player: Player;
};

function PlayerDisplay({
  player: { username, color, iconId, isAdmin },
}: Props) {
  return (
    <S.Wrapper>
      <S.IconContainer playerColor={color}>
        <img src={Icons[iconId]} alt={username} />
      </S.IconContainer>
      <S.Name>{username}</S.Name>
    </S.Wrapper>
  );
}

export default PlayerDisplay;
