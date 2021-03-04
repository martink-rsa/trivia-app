import React, { useState, useEffect } from "react";
import * as S from "./PlayerDisplay.style";
import Player from "../../shared/Player";

type Props = {
  player: Player;
};

function PlayerDisplay({ player }: Props) {
  return (
    <S.Wrapper>
      <S.IconContainer>MK</S.IconContainer>
      <S.Name>{player.username}</S.Name>
    </S.Wrapper>
  );
}

export default PlayerDisplay;
