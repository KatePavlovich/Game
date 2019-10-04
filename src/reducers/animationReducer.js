const initialState = {
  position: [0, 0],
  spriteLocation: '0px 0px',
  walkIndex: 0,
  showAnimation: false,
  spriteIMG: ''
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_ANIMATION': {
      return {
        ...state,
        position: action.position,
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation,
        spriteIMG: action.spriteIMG,
        showAnimation: true
      };
    }
    case 'RESET_ANIMATION': {
      return {
        ...state,
        position: [0, 0],
        spriteLocation: '0px 0px',
        walkIndex: 0,
        showAnimation: false
      };
    }

    default:
      return state;
  }
};

export default animationReducer;
