import React, { useState, useEffect } from "react";
import * as S from "./Lobby.style";
import Button from "../../components/Button/Button";
import PlayerDisplay from "../../components/PlayerDisplay/PlayerDisplay";
import Player from "../../shared/Player";

type Props = {
  // handleJoin: (name: string, room: string) => void;
};

/** The Lobby screen that shows all the players and leads
 * to the main game
 */
function Lobby(props: Props) {
  const [players, setPlayers] = useState<Player[]>([
    { username: "MICHAEL", iconId: 0, color: "blue", isAdmin: false },
    { username: "JIM", iconId: 1, color: "green", isAdmin: false },
    { username: "PAM", iconId: 2, color: "purple", isAdmin: true },
    { username: "DWIGHT", iconId: 3, color: "red", isAdmin: false },
  ]);
  /**
   * Submits the user's details
   * @param event The Form event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    //
  };

  return (
    <S.Wrapper>
      <S.PlayersList>
        {players.map((player) => (
          <PlayerDisplay player={player} />
        ))}
      </S.PlayersList>
      <form onSubmit={handleSubmit}>
        <Button type="submit" fullWidth>
          START
        </Button>
      </form>
    </S.Wrapper>
  );
}

export default Lobby;
