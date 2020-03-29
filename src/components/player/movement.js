import store from "../../store.ts";
import * as C from "../../constants";

export default function handleMovement(player) {
  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;
    switch (direction) {
      case C.EAST:
        return [oldPos[0] - C.SPRITE_SIZE, oldPos[1]];
      case C.WEST:
        return [oldPos[0] + C.SPRITE_SIZE, oldPos[1]];
      default:
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case C.WEST:
        return `${C.SPRITE_SIZE * walkIndex}px ${C.SPRITE_SIZE * 0}px`;

      case C.EAST:
        return `${C.SPRITE_SIZE * walkIndex}px ${C.SPRITE_SIZE * -1}px`;
      default:
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 5 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    return newPos[0] >= 0 &&
      newPos[0] <= C.MAP_WIDTH - C.SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= C.MAP_HEIGHT - C.SPRITE_SIZE
      ? newPos
      : oldPos;
  }

  function dispatchMove(direction) {
    const walkIndex = getWalkIndex();
    const oldPos = store.getState().player.position;
    store.dispatch({
      type: C.MOVE_PLAYER,
      payload: {
        position: observeBoundaries(oldPos, getNewPosition(direction)),
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.key) {
      case C.ARROW_RIGHT:
        return dispatchMove(C.WEST);
      case C.ARROW_LEFT:
        return dispatchMove(C.EAST);
      default:
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return player;
}
