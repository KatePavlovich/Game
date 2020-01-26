import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  REDUCE_MONSTER_LIFE,
  REDUCE_PLAYER_LIFE,
  failureAudio,
  winAudio
} from "../constants";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withReduceLives = WrappedComponent => {
  const WithReduceLives = props => {
    const playerLife = useSelector(state => state.player.playerLife);
    const monsterLife = useSelector(state => state.monster.monsterLife);
    const { sound } = useSelector(state => state.sound);
    const dispatch = useDispatch();

    const reduceMonsterLife = () => {
      if (monsterLife === 0) return;
      dispatch({ type: REDUCE_MONSTER_LIFE });
      sound && winAudio.play();
    };

    const reducePlayerLife = () => {
      if (playerLife === 0) return;
      dispatch({ type: REDUCE_PLAYER_LIFE });
      sound && failureAudio.play();
    };

    return (
      <WrappedComponent
        {...props}
        reduceMonsterLife={reduceMonsterLife}
        reducePlayerLife={reducePlayerLife}
        monsterLife={monsterLife}
        playerLife={playerLife}
      />
    );
  };
  WithReduceLives.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )}`;

  return WithReduceLives;
};

export { withReduceLives };
