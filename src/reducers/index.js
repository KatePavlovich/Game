import { combineReducers } from "redux";
import playerReducer from "./playerReducer";
import monsterReducer from "./monsterReducer";
import spellReducer from "./spellReducer";
import tilesReducer from "./tilesReducer";
import tasksReducer from "./tasksReducer";
import animationReducer from "./animationReducer";

const rootReducer = combineReducers({
  player: playerReducer,
  monster: monsterReducer,
  spell: spellReducer,
  map: tilesReducer,
  tasks: tasksReducer,
  animation: animationReducer
});

export default rootReducer;
