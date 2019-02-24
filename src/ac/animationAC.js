import store from "../store";
import {
  MOVE_ANIMATION,
  FIRE_SPRITE_SIZE,
  RESET_ANIMATION
} from "../constants";

export const moveAnimation = (
  position,
  walkIndex,
  spriteLocation,
  spriteIMG
) => {
  return {
    type: MOVE_ANIMATION,
    position,
    walkIndex,
    spriteLocation,
    spriteIMG
  };
};

export const resetAnimation = () => {
  return {
    type: RESET_ANIMATION
  };
};

const getSpriteLocation = walkIndex => {
  return `-${FIRE_SPRITE_SIZE * walkIndex}px -${FIRE_SPRITE_SIZE * 2.5}px`;
};

const getWalkIndex = () => {
  const walkIndex = store.getState().animation.walkIndex;
  return walkIndex >= 5 ? 2 : walkIndex + 1;
};

const getSprite = sprite => {
  switch (sprite) {
    case "fire":
      return "/tiles/flame_fire.png";
    case "leaf":
      return "/tiles/flame_blueish_flame.png";
    default:
  }
};

export const moveAnimationThunk = sprite => dispatch => {
  const walkIndex = getWalkIndex();
  const spriteIMG = getSprite(sprite);

  console.log("sprite", sprite);
  console.log("spriteIMG", spriteIMG);
  const oldPos = store.getState().animation.position;
  let position = oldPos;
  position = [
    oldPos[0] + FIRE_SPRITE_SIZE * 3.5,
    oldPos[1] + FIRE_SPRITE_SIZE * 3
  ];

  let spriteLocation = getSpriteLocation(walkIndex);
  let action = moveAnimation(position, walkIndex, spriteLocation, spriteIMG);
  dispatch(action);
};
