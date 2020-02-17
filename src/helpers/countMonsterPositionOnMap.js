import * as C from "../constants";

export const countMonsterPositionOnMap = tiles => {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === C.ENEMY_ON_MAP) {
        return [j, i];
      }
    }
  }
};
