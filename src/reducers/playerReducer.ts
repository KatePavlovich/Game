import * as C from "../constants";

const initialState = {
  playerName: "",
  playerLife: C.MAX_PLAYER_LIFE,
  position: C.BASIC_PLAYER_POSITION,
  spriteLocation: C.BASIC_SPRITE_LOCATION,
  direction: C.EAST,
  walkIndex: C.BASIC_WALKINDEX,
  isLoggedIn: false,
  isPlayerOnLevelExit: false,
  shouldPlayHealthAnimation: false
};

export type InitialStateType = typeof initialState;

const playerReducer = (state = initialState, action: any): InitialStateType => {
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
      return {
        ...state,
        playerLife: state.playerLife - C.LIFE_TO_REDUCE_WITH_SPELL
      };
    }
    case C.RESTORE_PLAYER_LIFE: {
      return { ...state, playerLife: C.MAX_PLAYER_LIFE };
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
        position: C.BASIC_PLAYER_POSITION,
        spriteLocation: C.BASIC_SPRITE_LOCATION,
        direction: C.EAST,
        walkIndex: C.BASIC_WALKINDEX
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
