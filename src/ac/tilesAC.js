import { ADD_TILES, CHANGE_TILES } from "../constants";
import store from "../store";

export const addTilesAC = tiles => {
  return {
    type: ADD_TILES,
    tiles
  };
};

export const changeTilesAC = tiles => {
  return {
    type: CHANGE_TILES,
    tiles
  };
};

export const changeTilesThunk = () => dispatch => {
  const tiles = store.getState().map.tiles;
  const newTiles = [
    tiles[0].map(tile => {
      if (tile === 2) {
        tile = 3;
      }
      return tile;
    }),
    ...tiles.slice(1)
  ];
  let action = changeTilesAC(newTiles);
  dispatch(action);
};

export const restorePrisonThunk = () => dispatch => {
  const tiles = store.getState().map.tiles;
  const newTiles = [
    tiles[0].map(tile => {
      if (tile === 3) {
        tile = 2;
      }
      return tile;
    }),
    ...tiles.slice(1)
  ];
  let action = changeTilesAC(newTiles);
  dispatch(action);
};
