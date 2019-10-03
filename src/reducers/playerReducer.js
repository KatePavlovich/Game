const initialState = {
  playerName: "",
  playerLife: 100,
  position: [0, 0],
  spriteLocation: "0px 0px",
  direction: "east",
  walkIndex: 0,
  nextLevel: false,
  killedMonsters: 0,
  isLoggedIn: false
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, isLoggedIn: true };
    }
    case "LOGOUT": {
      return { ...state, isLoggedIn: false };
    }
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
    case "WON_LEVEL": {
      return {
        ...state,
        nextLevel: true,
        killedMonsters: state.killedMonsters + 1
      };
    }
    case "RESET_NEXT_LEVEL": {
      return {
        ...state,
        nextLevel: false
      };
    }
    case "RESET_POSITION": {
      return {
        ...state,
        position: [0, 0],
        spriteLocation: "0px 0px",
        direction: "east",
        walkIndex: 0
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
