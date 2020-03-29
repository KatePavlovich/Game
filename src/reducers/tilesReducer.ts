import { InitialStateType, TilesActionTypes } from "./../store/tiles/types";
import * as C from "../constants";

const initialState: InitialStateType = {
  tiles: []
};

const tilesReducer = (
  state = initialState,
  action: TilesActionTypes
): InitialStateType => {
  switch (action.type) {
    case C.ADD_TILES: {
      return {
        ...state,
        tiles: action.tiles
      };
    }
    case C.CHANGE_TILES: {
      return {
        ...state,
        tiles: action.tiles
      };
    }
    default:
      return state;
  }
};

export default tilesReducer;
