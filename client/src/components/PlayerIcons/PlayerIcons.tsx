import * as S from './Icons.style';
import IconDeer from './IconDeer';
import IconBear from './IconBear';
import IconOwl from './IconOwl';
import IconFox from './IconFox';
import IconSquirrel from './IconSquirrel';
import IconBird from './IconBird';
import IconBee from './IconBee';
import IconPanda from './IconPanda';
import IconMonkey from './IconMonkey';

type Props = {
  id: number;
  color: string;
  size?: number;
};

function PlayerIcons({ id, color, size = 70 }: Props) {
  switch (id) {
    case 0:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconDeer />
        </S.IconContainer>
      );
    case 1:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconBear />
        </S.IconContainer>
      );
    case 2:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconOwl />
        </S.IconContainer>
      );
    case 3:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconFox />
        </S.IconContainer>
      );
    case 4:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconSquirrel />
        </S.IconContainer>
      );
    case 5:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconBird />
        </S.IconContainer>
      );
    case 6:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconBee />
        </S.IconContainer>
      );
    case 7:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconPanda />
        </S.IconContainer>
      );
    case 8:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconMonkey />
        </S.IconContainer>
      );
    default:
      return (
        <S.IconContainer size={size} playerColor={color}>
          <IconDeer />
        </S.IconContainer>
      );
  }
}

export default PlayerIcons;
