import * as C from "../constants";

export const countMonsterPositionInPx = ([positionX, positionY]) => [
  positionX * C.SPRITE_BACKGROUND_SIZE,
  positionY * C.SPRITE_BACKGROUND_SIZE - C.MONSTER_SPRITE_HEIGHT
];
