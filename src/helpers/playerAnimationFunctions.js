import * as C from "../constants";

export const getSpriteLocation = (direction, walkIndex) => {
  switch (direction) {
    case C.WEST:
      return `-${C.SPRITE_SIZE * walkIndex}px ${C.SPRITE_SIZE * 0}px`;
    case C.EAST:
      return `-${C.SPRITE_SIZE * walkIndex}px ${C.SPRITE_SIZE * -1}px`;
    case C.NORTH:
      return `-${C.SPRITE_SIZE * walkIndex}px ${(C.SPRITE_SIZE - 2) * -3}px`;
    case C.SOUTH:
      return `-${C.SPRITE_SIZE * walkIndex}px ${(C.SPRITE_SIZE - 2) * 0}px`;
    default:
  }
};

export const getNewPosition = (oldPos, direction) => {
  switch (direction) {
    case C.EAST:
      return [oldPos[0] - C.SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case C.WEST:
      return [oldPos[0] + C.SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case C.NORTH:
      return [oldPos[0], oldPos[1] - C.SPRITE_BACKGROUND_SIZE];
    case C.SOUTH:
      return [oldPos[0], oldPos[1] + C.SPRITE_BACKGROUND_SIZE];
    default:
  }
};

export const getNewPositionAfterHitMonster = (oldPos, direction) => {
  switch (direction) {
    case C.EAST:
      return [oldPos[0] + C.SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case C.WEST:
      return [oldPos[0] - C.SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case C.NORTH:
      return [oldPos[0], oldPos[1] + C.SPRITE_BACKGROUND_SIZE];
    case C.SOUTH:
      return [oldPos[0], oldPos[1] - C.SPRITE_BACKGROUND_SIZE];
    default:
  }
};

export const observeBoundaries = newPos => {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= C.MAP_WIDTH - C.SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= C.MAP_HEIGHT - C.SPRITE_SIZE * 1.5
  );
};

export const observeImpassable = (newPos, tiles) => {
  const y = newPos[1] / C.SPRITE_BACKGROUND_SIZE;
  const x = newPos[0] / C.SPRITE_BACKGROUND_SIZE;
  const nextTile = tiles[y][x];
  return nextTile >= 3 && nextTile <= 10;
};

export const observeExit = newPos => {
  if (newPos[0] > 560 && newPos[1] < 0) {
    return true;
  }
};

export const getWalkIndex = oldWalkIndex => {
  return oldWalkIndex >= 3 ? 0 : oldWalkIndex + 1;
};

const roundToTheNearestTen = num => Math.ceil(num / 10) * 10;

export const hitMonster = (monsterPosition, newPos) => {
  const [positionX, positionY] = monsterPosition;
  const monsterPositionOnMapX = roundToTheNearestTen(
    positionX - (window.screen.width - C.MAP_WIDTH) / 2 - C.MONSTER_SPRITE_WIDTH
  );
  const monsterPositionOnMapY = roundToTheNearestTen(
    positionY + C.MONSTER_SPRITE_HEIGHT / 2
  );
  const [playerPositionX, playerPositionY] = newPos;
  return (
    playerPositionX - C.SPRITE_BACKGROUND_SIZE >= monsterPositionOnMapX &&
    playerPositionY >= monsterPositionOnMapY
  );
};
