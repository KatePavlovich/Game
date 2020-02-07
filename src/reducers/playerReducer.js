import * as C from "../constants";

const initialState = {
  playerName: "",
  playerLife: 100,
  position: [0, 0],
  spriteLocation: "0px 0px",
  direction: "east",
  walkIndex: 0,
  isLoggedIn: false,
  isPlayerOnLevelExit: false,
  shouldPlayHealthAnimation: false
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.LOGIN: {
      return { ...state, isLoggedIn: true };
    }
    case C.LOGOUT: {
      return { ...state, isLoggedIn: false };
    }
    case C.GET_PLAYER_NAME: {
      return { ...state, playerName: action.playerName };
    }
    case C.REDUCE_PLAYER_LIFE: {
      return { ...state, playerLife: state.playerLife - 20 };
    }
    case C.RESTORE_PLAYER_LIFE: {
      return { ...state, playerLife: 100 };
    }
    case C.SHOULD_PLAY_HEALTH_ANIMATION: {
      return {
        ...state,
        shouldPlayHealthAnimation: !state.shouldPlayHealthAnimation
      };
    }
    case C.MOVE_PLAYER: {
      return {
        ...state,
        position: action.position,
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation
      };
    }
    case C.SET_PLAYER_ON_LEVEL_EXIT: {
      return {
        ...state,
        isPlayerOnLevelExit: true
      };
    }
    case C.SET_PLAYER_ON_LEVEL_START: {
      return {
        ...state,
        isPlayerOnLevelExit: false
      };
    }
    case C.RESET_PLAYER_POSITION: {
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
