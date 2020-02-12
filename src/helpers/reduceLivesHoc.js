import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reduceMonsterLife } from "../ac/monsterAC";
import * as C from "../constants";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withReduceLives = WrappedComponent => {
  const WithReduceLives = props => {
    const playerLife = useSelector(state => state.player.playerLife);
    const monsterLife = useSelector(state => state.monster.monsterLife);
    const { sound } = useSelector(state => state.sound);
    const isSpellChoosen = useSelector(state => state.spell.isSpellChoosen);
    const choosenSpell = useSelector(state => state.spell.choosedSpell);

    const dispatch = useDispatch();

    const reduceMonsterLifeFunc = () => {
      if (monsterLife === 0) return;
      const lifeToReduce = isSpellChoosen
        ? C.LIFE_TO_REDUCE_WITH_SPELL
        : C.LIFE_TO_REDUCE_WITHOUT_SPELL;
      dispatch(reduceMonsterLife(lifeToReduce));
      sound && C.winAudio.play();
    };

    const reducePlayerLife = () => {
      if (playerLife === 0) return;
      if (choosenSpell === C.ARMOR) return;
      dispatch({ type: C.REDUCE_PLAYER_LIFE });
      sound && C.failureAudio.play();
    };

    const showStaticAnimationFunc = () => {
      dispatch({ type: C.SHOW_STATIC_ANIMATION });
      dispatch({ type: C.RESET_SPELL });
    };

    return (
      <WrappedComponent
        {...props}
        reduceMonsterLife={reduceMonsterLifeFunc}
        reducePlayerLife={reducePlayerLife}
        monsterLife={monsterLife}
        playerLife={playerLife}
        showStaticAnimation={showStaticAnimationFunc}
      />
    );
  };
  WithReduceLives.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )}`;

  return WithReduceLives;
};

export { withReduceLives };
