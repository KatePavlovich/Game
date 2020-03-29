import { ADD_TILES, CHANGE_TILES } from "../../constants";

const initialState = {
  tiles: [] as Array<Array<number>>
};

export type InitialStateType = typeof initialState;

interface addTilesAction {
  type: typeof ADD_TILES;
  tiles: number[][];
}

interface changeTilesAction {
  type: typeof CHANGE_TILES;
  tiles: number[][];
}

export type TilesActionTypes = addTilesAction | changeTilesAction;
