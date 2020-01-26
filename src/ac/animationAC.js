import store from "../store";
import * as C from "../constants";

export const moveAnimation = (
  position,
  walkIndex,
  spriteLocation,
  spriteIMG
) => {
  return {
    type: C.MOVE_ANIMATION,
    position,
    walkIndex,
    spriteLocation,
    spriteIMG
  };
};

export const resetAnimation = positionY => {
  return {
    type: C.RESET_ANIMATION,
    position: [0, positionY]
  };
};

const getSpriteLocation = walkIndex => {
  return `-${C.FIRE_SPRITE_WIDTH * walkIndex}px -${C.FIRE_SPRITE_HEIGHT}px`;
};

const getWalkIndex = () => {
  const walkIndex = store.getState().animation.walkIndex;
  return walkIndex >= 5 ? 2 : walkIndex + 1;
};

const getSprite = sprite => {
  switch (sprite) {
    case C.FIRE:
      return "/tiles/flame_fire.png";
    case C.LEAF:
      return "/tiles/flame_blueish_flame.png";
    default:
  }
};

export const getAnimationInitialPosition = position => {
  return {
    type: C.GET_ANIMATION_INITIAL_POSITION,
    position
  };
};

export const moveAnimationThunk = sprite => dispatch => {
  const walkIndex = getWalkIndex();
  const spriteIMG = getSprite(sprite);

  const oldPos = store.getState().animation.position;
  let position = [...oldPos];
  position = [oldPos[0] + C.FIRE_SPRITE_WIDTH * 6, oldPos[1]];

  let spriteLocation = getSpriteLocation(walkIndex);
  let action = moveAnimation(position, walkIndex, spriteLocation, spriteIMG);
  dispatch(action);
};
