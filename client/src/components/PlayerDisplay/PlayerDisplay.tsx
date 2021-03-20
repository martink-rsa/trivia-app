import * as S from './PlayerDisplay.style';
import Player from '../../shared/Player';
import Icons from '../PlayerIcons/PlayerIcons';
import IconAdmin from '../../assets/images/crown.svg';
import playerColors from '../../shared/playerColors';

type Props = {
  player: Player;
};

/** Displays a player icon with a name */
function PlayerDisplay({
  player: { username, colorId, iconId, isAdmin },
}: Props) {
  console.log(isAdmin);
  return (
    <S.Wrapper>
      <S.IconWrapper>
        {isAdmin && <S.AdminImage src={IconAdmin} alt="Player admin icon" />}
        <Icons id={iconId} color={playerColors[colorId]} />
      </S.IconWrapper>
      <S.Name>{username}</S.Name>
    </S.Wrapper>
  );
}

export default PlayerDisplay;
