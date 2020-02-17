import * as C from "../constants";

const initialState = {
  monsterName: "",
  monsterLife: 100,
  position: [100, 10],
  positionInPx: [0, 0]
};

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.GET_MONSTER_NAME: {
      return {
        ...state,
        monsterName: action.monsterName
      };
    }
    case C.REDUCE_MONSTER_LIFE: {
      return { ...state, monsterLife: state.monsterLife - action.lifeToReduce };
    }
    case C.MAKE_NEW_MONSTER: {
      return { ...state, monsterLife: 100 };
    }
    case C.GET_MONSTER_POSITION: {
      return { ...state, position: action.position };
    }
    case C.SET_MONSTER_POSITION_IN_PX: {
      return {
        ...state,
        positionInPx: action.positionInPx
      };
    }

    default:
      return state;
  }
};

export default monsterReducer;
