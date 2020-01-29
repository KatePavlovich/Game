const initialState = {
  monsterName: "",
  monsterLife: 100,
  position: [100, 10]
};

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MONSTER_NAME": {
      return {
        ...state,
        monsterName: action.monsterName
      };
    }
    case "REDUCE_MONSTER_LIFE": {
      return { ...state, monsterLife: state.monsterLife - action.lifeToReduce };
    }
    case "MAKE_NEW_MONSTER": {
      return { ...state, monsterLife: 100 };
    }
    case "GET_MONSTER_POSITION": {
      return { ...state, position: action.position };
    }

    default:
      return state;
  }
};

export default monsterReducer;
