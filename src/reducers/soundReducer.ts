import * as C from "../constants";

const initialState = {
  sound: true
};

export type InitialStateType = typeof initialState;

const soundReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case C.TOGGLE_SOUND: {
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
