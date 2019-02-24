const initialState = {
  tiles: []
};

const tilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TILES": {
      return {
        ...state,
        tiles: action.tiles
      };
    }
    case "CHANGE_TILES": {
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
