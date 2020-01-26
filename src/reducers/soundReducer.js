const initialState = {
  sound: true
};

const soundReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SOUND": {
      return {
        ...state,
        sound: !state.sound
      };
    }
    default:
      return state;
  }
};

export default soundReducer;
