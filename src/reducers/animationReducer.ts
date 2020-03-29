import * as C from "../constants";

const initialState = {
  position: [0, 0],
  spriteLocation: "0px 0px",
  walkIndex: 0,
  showAnimation: false,
  spriteIMG: "",
  showStaticAnimation: false
};

export type InitialStateType = typeof initialState;

const animationReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case C.GET_ANIMATION_INITIAL_POSITION: {
      return {
        ...state,
        position: [...action.position]
      };
    }
    case C.MOVE_ANIMATION: {
      return {
        ...state,
        position: [...action.position],
        walkIndex: action.walkIndex,
        spriteLocation: action.spriteLocation,
        spriteIMG: action.spriteIMG,
        showAnimation: true
      };
    }
    case C.RESET_ANIMATION: {
      return {
        ...state,
        position: [...action.position],
        spriteLocation: "0px 0px",
        walkIndex: 0,
        showAnimation: false
      };
    }
    case C.SHOW_STATIC_ANIMATION: {
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
