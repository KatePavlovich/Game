import * as C from "../constants";
import store from "../store";
import { TilesActionTypes } from "../store/tiles/types";

export const addTilesAC = (tiles: number[][]): TilesActionTypes => {
  return {
    type: C.ADD_TILES,
    tiles
  };
};

export const changeTilesAC = (tiles: number[][]): TilesActionTypes => {
  return {
    type: C.CHANGE_TILES,
    tiles
  };
};

export const changeTilesThunk = () => (dispatch: any) => {
  const tiles = store.getState().map.tiles;
  const newTiles = [
    tiles[0].map((tile: any) => {
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
