import * as C from "../constants";
import { adjective, creature, monsterName } from "../constants";
import { getRandomValueFromArray } from "../helperFunctions";

const getMonsterNameAC = monsterName => {
  return {
    type: C.GET_MONSTER_NAME,
    monsterName
  };
};

export const makeMonsterNameThunk = () => dispatch => {
  let name = `${getRandomValueFromArray(adjective)} ${getRandomValueFromArray(
    creature
  )} ${getRandomValueFromArray(monsterName)}`;
  let action = getMonsterNameAC(name);
  dispatch(action);
};

export const reduceMonsterLife = lifeToReduce => {
  return {
    type: C.REDUCE_MONSTER_LIFE,
    lifeToReduce
  };
};

export const getMonsterPosition = position => {
  return {
    type: C.GET_MONSTER_POSITION,
    position
  };
};

export const makeNewMonster = (monsterLife, monsterName) => {
  return {
    type: C.MAKE_NEW_MONSTER,
    monsterLife,
    monsterName
  };
};
