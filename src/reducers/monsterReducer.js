const initialState = {
  monsterName: "",
  monsterLife: 100
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
      return { ...state, monsterLife: state.monsterLife - 20 };
    }
    case "MAKE_NEW_MONSTER": {
      return { ...state, monsterLife: 100 };
    }

    default:
      return state;
  }
};

export default monsterReducer;
