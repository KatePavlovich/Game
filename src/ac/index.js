import * as C from "../constants";
import { adjective, creature, monsterName } from "../constants";
import { getRandomValueFromArray } from "../helperFunctions";
import store from "../store";

export const isLoggedIn = () => {
  return {
    type: C.LOGIN
  };
};

export const isLoggedOut = () => {
  return {
    type: C.LOGOUT
  };
};

export const getPlayerNameAC = playerName => {
  return {
    type: C.GET_PLAYER_NAME,
    playerName
  };
};

export const getMonsterNameAC = monsterName => {
  return {
    type: C.GET_MONSTER_NAME,
    monsterName
  };
};

export const makeMonsterNameThunk = () => dispatch => {
  let name = `${getRandomValueFromArray(adjective)} ${getRandomValueFromArray(
    creature
  )} ${getRandomValueFromArray(monsterName)}`;
  let action = getMonsterNameAC(name);
  dispatch(action);
};

export const reduceMonsterLife = lifeToReduce => {
  return {
    type: C.REDUCE_MONSTER_LIFE,
    lifeToReduce
  };
};

export const getMonsterPosition = position => {
  return {
    type: C.GET_MONSTER_POSITION,
    position
  };
};

export const reducePlayerLife = () => {
  return {
    type: C.REDUCE_PLAYER_LIFE
  };
};

export const restorePlayerLife = () => {
  return {
    type: C.RESTORE_PLAYER_LIFE
  };
};

export const makeNewMonster = (monsterLife, monsterName) => {
  return {
    type: C.MAKE_NEW_MONSTER,
    monsterLife,
    monsterName
  };
};

export const setPlayerOnLevelExit = () => {
  return {
    type: C.SET_PLAYER_ON_LEVEL_EXIT
  };
};

export const setPlayerOnLevelStart = () => {
  return {
    type: C.SET_PLAYER_ON_LEVEL_START
  };
};

export const resetPlayerPosition = () => {
  return {
    type: C.RESET_PLAYER_POSITION
  };
};

export const movePlayer = (position, walkIndex, spriteLocation) => {
  return {
    type: C.MOVE_PLAYER,
    position,
    walkIndex,
    spriteLocation
  };
};

export const movePlayerThunk = direction => dispatch => {
  const walkIndex = getWalkIndex();
  const oldPos = store.getState().player.position;
  const newPos = getNewPosition(oldPos, direction);

  let position = oldPos;
  if (observeBoundaries(newPos) && observeImpassable(newPos)) {
    position = getNewPosition(oldPos, direction);
  }
  if (observeExit(newPos)) {
    dispatch(setPlayerOnLevelExit());
  }

  let spriteLocation = getSpriteLocation(direction, walkIndex);

  let action = movePlayer(position, walkIndex, spriteLocation);
  dispatch(action);
};

function getSpriteLocation(direction, walkIndex) {
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
}

function getNewPosition(oldPos, direction) {
  // const oldPos = store.getState().player.position;
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
}

function observeBoundaries(newPos) {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= C.MAP_WIDTH - C.SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= C.MAP_HEIGHT - C.SPRITE_SIZE * 1.5
  );
}

function observeImpassable(newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / C.SPRITE_BACKGROUND_SIZE;
  const x = newPos[0] / C.SPRITE_BACKGROUND_SIZE;
  const nextTile = tiles[y][x];
  return nextTile >= 3 && nextTile <= 10;
}

function observeExit(newPos) {
  if (newPos[0] > 560 && newPos[1] < 0) {
    return true;
  }
}

function getWalkIndex() {
  const walkIndex = store.getState().player.walkIndex;
  return walkIndex >= 3 ? 0 : walkIndex + 1;
}

export const toggleSound = () => {
  return {
    type: C.TOGGLE_SOUND
  };
};
