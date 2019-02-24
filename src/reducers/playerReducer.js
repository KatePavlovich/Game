const initialState = {
  playerName: "",
  playerLife: 100,
  position: [0, 0],
  spriteLocation: "0px 0px",
  direction: "east",
  walkIndex: 0
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLAYER_NAME": {
      return { ...state, playerName: action.playerName };
    }
    case "REDUCE_PLAYER_LIFE": {
      return { ...state, playerLife: state.playerLife - 20 };
    }
    case "MOVE_PLAYER": {
      return {
        ...state,
        position: action.position,
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
