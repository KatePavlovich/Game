const initialState = {
  position: [0, 0],
  spriteLocation: "0px 0px",
  walkIndex: 0,
  showAnimation: false,
  spriteIMG: "",
  showStaticAnimation: false
};

const animationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ANIMATION_INITIAL_POSITION": {
      return {
        ...state,
        position: [...action.position]
      };
    }
    case "MOVE_ANIMATION": {
      return {
        ...state,
        position: [...action.position],
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation,
        spriteIMG: action.spriteIMG,
        showAnimation: true
      };
    }
    case "RESET_ANIMATION": {
      return {
        ...state,
        position: [...action.position],
        spriteLocation: "0px 0px",
        walkIndex: 0,
        showAnimation: false
      };
    }
    case "SHOW_STATIC_ANIMATION": {
      return {
        ...state,
        showStaticAnimation: !state.showStaticAnimation
      };
    }

    default:
      return state;
  }
};

export default animationReducer;
