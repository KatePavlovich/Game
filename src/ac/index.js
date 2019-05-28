import {
  GET_PLAYER_NAME,
  GET_MONSTER_NAME,
  REDUCE_MONSTER_LIFE,
  REDUCE_PLAYER_LIFE,
  MAKE_NEW_MONSTER,
  MOVE_PLAYER,
  MAP_WIDTH,
  SPRITE_SIZE,
  MAP_HEIGHT,
  SPRITE_BACKGROUND_SIZE,
  WON_LEVEL,
  RESET_PLAYER_POSITION,
  LOGIN,
  LOGOUT
} from "../constants";
import { adjective, creature, monsterName } from "../constants";
import { getRandomValueFromArray } from "../helperFunctions";
import store from "../store";

export const isLoggedIn = () => {
  return {
    type: LOGIN
  };
};

export const isLoggedOut = () => {
  return {
    type: LOGOUT
  };
};

export const getPlayerNameAC = playerName => {
  return {
    type: GET_PLAYER_NAME,
    playerName
  };
};

export const resetPlayerPosition = () => {
  return {
    type: RESET_PLAYER_POSITION
  };
};

export const getMonsterNameAC = monsterName => {
  return {
    type: GET_MONSTER_NAME,
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

export const reduceMonsterLife = () => {
  return {
    type: REDUCE_MONSTER_LIFE
  };
};

export const reducePlayerLife = () => {
  return {
    type: REDUCE_PLAYER_LIFE
  };
};

export const makeNewMonster = (monsterLife, monsterName) => {
  return {
    type: MAKE_NEW_MONSTER,
    monsterLife,
    monsterName
  };
};

export const movePlayer = (position, walkIndex, spriteLocation) => {
  return {
    type: MOVE_PLAYER,
    position,
    walkIndex,
    spriteLocation
  };
};

export const makeNextLevel = (nextLevel, killedMonsters) => {
  return {
    type: WON_LEVEL
    //nextLevel
    //killedMonsters
  };
};

export const movePlayerThunk = direction => dispatch => {
  const walkIndex = getWalkIndex();
  const oldPos = store.getState().player.position;
  const newPos = getNewPosition(oldPos, direction);
  let position = oldPos;
  let nextLevel = store.getState().player.nextLevel;
  if (observeBoundaries(newPos) && observeImpassable(newPos)) {
    position = getNewPosition(oldPos, direction);
  }
  if (observeBoundaries(newPos) && observeExit(newPos)) {
    //position = getNewPosition(oldPos, direction);
    //nextLevel = true;
    dispatch(makeNextLevel());
  }
  let spriteLocation = getSpriteLocation(direction, walkIndex);

  let action = movePlayer(position, walkIndex, spriteLocation);
  dispatch(action);
};

// export const resetPlayerPosition = (
//   position,
//   walkIndex,
//   spriteLocation
// ) => dispatch => {
//   let action = movePlayer(position, walkIndex, spriteLocation);
//   console.log("object", action);

//   dispatch(action);
// };

function getSpriteLocation(direction, walkIndex) {
  switch (direction) {
    case "WEST":
      return `-${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    case "EAST":
      return `-${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * -1}px`;
    case "NORTH":
      return `-${SPRITE_SIZE * walkIndex}px ${(SPRITE_SIZE - 2) * -3}px`;
    case "SOUTH":
      return `-${SPRITE_SIZE * walkIndex}px ${(SPRITE_SIZE - 2) * 0}px`;
    default:
  }
}

function getNewPosition(oldPos, direction) {
  // const oldPos = store.getState().player.position;
  switch (direction) {
    case "EAST":
      return [oldPos[0] - SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case "WEST":
      return [oldPos[0] + SPRITE_BACKGROUND_SIZE, oldPos[1]];
    case "NORTH":
      return [oldPos[0], oldPos[1] - SPRITE_BACKGROUND_SIZE];
    case "SOUTH":
      return [oldPos[0], oldPos[1] + SPRITE_BACKGROUND_SIZE];
    default:
  }
}

function observeBoundaries(newPos) {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= MAP_HEIGHT - SPRITE_SIZE * 1.5
  );
}

function observeImpassable(newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_BACKGROUND_SIZE;
  const x = newPos[0] / SPRITE_BACKGROUND_SIZE;
  const nextTile = tiles[y][x];
  return nextTile >= 3 && nextTile <= 10;
}

function observeExit(newPos) {
  if (newPos[0] > 600 && newPos[1] === 0) {
    return true;
  }
}

function getWalkIndex() {
  const walkIndex = store.getState().player.walkIndex;
  return walkIndex >= 3 ? 0 : walkIndex + 1;
}
