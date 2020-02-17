import * as C from "../constants";
import store from "../store";

export const addTilesAC = tiles => {
  return {
    type: C.ADD_TILES,
    tiles
  };
};

export const changeTilesAC = tiles => {
  return {
    type: C.CHANGE_TILES,
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
