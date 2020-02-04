import store from "../store";
import * as C from "../constants";
import { restorePlayerLife } from "./index";

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

const playOneAnimationStep = (sprite, stepsAmount) => {
  const walkIndex = getWalkIndex();
  const spriteIMG = getSprite(sprite);

  const oldPos = store.getState().animation.position;
  let position = [...oldPos];
  position = [oldPos[0] + C.FIRE_SPRITE_WIDTH * stepsAmount, oldPos[1]];

  let spriteLocation = getSpriteLocation(walkIndex);
  return moveAnimation(position, walkIndex, spriteLocation, spriteIMG);
};

export const moveAnimationThunk = sprite => dispatch => {
  if (sprite === C.HEALTH) {
    dispatch(restorePlayerLife());
    return;
  }

  let action = playOneAnimationStep(sprite, 6);
  dispatch(action);
};

export const showStaticAnimation = () => {
  return {
    type: C.SHOW_STATIC_ANIMATION
  };
};
