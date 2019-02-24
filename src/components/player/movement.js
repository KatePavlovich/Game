import store from "../../store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../constants";

export default function handleMovement(player) {
  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;
    switch (direction) {
      case "EAST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "WEST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      default:
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;

      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * -1}px`;
      default:
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 5 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    return newPos[0] >= 0 &&
    newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
      ? newPos
      : oldPos;
  }

  function dispatchMove(direction) {
    const walkIndex = getWalkIndex();
    const oldPos = store.getState().player.position;
    store.dispatch({
      type: "MOVE_PLAYER",
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
      case "ArrowRight":
        return dispatchMove("WEST");
      case "ArrowLeft":
        return dispatchMove("EAST");
      default:
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });

  return player;
}
