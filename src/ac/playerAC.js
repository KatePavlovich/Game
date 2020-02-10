import * as C from "../constants";
import store from "../store";
import * as F from "../helpers/playerAnimationFunctions";

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
  const tiles = store.getState().map.tiles;
  const oldWalkIndex = store.getState().player.walkIndex;
  const walkIndex = F.getWalkIndex(oldWalkIndex);
  const oldPos = store.getState().player.position;
  const newPos = F.getNewPosition(oldPos, direction);

  let position = oldPos;
  if (F.observeBoundaries(newPos) && F.observeImpassable(newPos, tiles)) {
    position = F.getNewPosition(oldPos, direction);
  }
  if (F.observeExit(newPos)) {
    dispatch(setPlayerOnLevelExit());
  }

  let spriteLocation = F.getSpriteLocation(direction, walkIndex);

  let action = movePlayer(position, walkIndex, spriteLocation);
  dispatch(action);
};
