import * as S from './PlayerDisplay.style';
import Player from '../../shared/Player';
import Icons from '../PlayerIcons/PlayerIcons';
import playerColors from '../../shared/playerColors';

type Props = {
  player: Player;
};

/** Displays a player icon with a name */
function PlayerDisplay({
  player: { username, colorId, iconId, isAdmin },
}: Props) {
  return (
    <li>
      <Icons id={iconId} color={playerColors[colorId]} />
      <S.Name>{username}</S.Name>
    </li>
  );
}

export default PlayerDisplay;
