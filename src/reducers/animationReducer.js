const initialState = {
  position: [0, 0],
  spriteLocation: "0px 0px",
  walkIndex: 0,
  showAnimation: false,
  spriteIMG: ""
};

const animationReducer = (
  state = initialState,
  { position, walkIndex, spriteLocation, spriteIMG, type }
) => {
  switch (type) {
    case "MOVE_ANIMATION": {
      return {
        ...state,
        position,
        walkIndex,
        spriteLocation,
        spriteIMG,
        showAnimation: true
      };
    }
    case "RESET_ANIMATION": {
      return {
        ...state,
        position: [0, 0],
        spriteLocation: "0px 0px",
        walkIndex: 0,
        showAnimation: false
      };
    }

    default:
      return state;
  }
};

export default animationReducer;
