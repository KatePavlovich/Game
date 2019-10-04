const initialState = {
  playerName: '',
  playerLife: 100,
  position: [0, 0],
  spriteLocation: '0px 0px',
  direction: 'east',
  walkIndex: 0,
  isLoggedIn: false,
  isPlayerOnLevelExit: false
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isLoggedIn: true };
    }
    case 'LOGOUT': {
      return { ...state, isLoggedIn: false };
    }
    case 'GET_PLAYER_NAME': {
      return { ...state, playerName: action.playerName };
    }
    case 'REDUCE_PLAYER_LIFE': {
      return { ...state, playerLife: state.playerLife - 20 };
    }
    case 'MOVE_PLAYER': {
      return {
        ...state,
        position: action.position,
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation
      };
    }
    case 'SET_PLAYER_ON_LEVEL_EXIT': {
      return {
        ...state,
        isPlayerOnLevelExit: true
      };
    }
    case 'SET_PLAYER_ON_LEVEL_START': {
      return {
        ...state,
        isPlayerOnLevelExit: false
      };
    }

    default:
      return state;
  }
};

export default playerReducer;
