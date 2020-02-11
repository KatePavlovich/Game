import * as C from "../constants";

export const setMonsterPosition = map => {
  switch (map) {
    case C.GRASS_MAP:
      return [290, 140];
    case C.TASK_MAP:
      return [100, 10];
    default:
  }
};
