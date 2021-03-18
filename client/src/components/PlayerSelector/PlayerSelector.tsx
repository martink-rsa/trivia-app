import { Dispatch, SetStateAction, MouseEvent } from 'react';
import * as S from './PlayerSelector.style';

import PlayerIcons from '../PlayerIcons/PlayerIcons';
import Caret from '../Icons/Caret/Caret';
import playerColors from '../../shared/playerColors';

type Props = {
  iconId: number;
  setIconId: Dispatch<SetStateAction<number>>;
  colorId: number;
  setColorId: Dispatch<SetStateAction<number>>;
};

const NUM_ICONS = 9;

/** Shows a list of avatar icons and colors a player can choose from */
function PlayerSelector({ iconId, setIconId, colorId, setColorId }: Props) {
  const handleIconChange = (event: MouseEvent<HTMLButtonElement>): void => {
    const direction = event.currentTarget.value;
    if (direction === 'left') {
      if (iconId === 0) {
        setIconId(NUM_ICONS - 1);
      } else {
        setIconId(iconId - 1);
      }
      //
    } else if (direction === 'right') {
      if (iconId === NUM_ICONS - 1) {
        setIconId(0);
      } else {
        setIconId(iconId + 1);
      }
    }
  };

  const handleColorChange = (event: MouseEvent<HTMLButtonElement>): void => {
    const index = event.currentTarget.value;
    setColorId(parseInt(index));
  };

  return (
    <S.Wrapper>
      <S.IconSelectionContainer>
        <S.CaretButton type="button" onClick={handleIconChange} value="left">
          <Caret direction="left" color="#fff" />
        </S.CaretButton>
        <PlayerIcons id={iconId} color={playerColors[colorId]} />
        <S.CaretButton type="button" onClick={handleIconChange} value="right">
          <Caret direction="right" color="#fff" />
        </S.CaretButton>
      </S.IconSelectionContainer>
      <S.ColorSelectionContainer>
        {playerColors.map((playerColor, index) => (
          <S.ColorButton
            key={playerColor}
            color={playerColor}
            type="button"
            onClick={handleColorChange}
            value={index}
            isActive={colorId === index}
          />
        ))}
      </S.ColorSelectionContainer>
    </S.Wrapper>
  );
}

export default PlayerSelector;
