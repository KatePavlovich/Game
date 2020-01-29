import * as C from "../constants";

export const chooseTaskAC = () => {
  return {
    type: C.CHOOSE_TASK
  };
};

export const wasTaskAnsweredAC = () => {
  return {
    type: C.ANSWER_TASK
  };
};

export const checkCorrectAnswerAC = wasAnswerCorrect => {
  return {
    type: C.CHECK_CORRECT_ANSWER,
    wasAnswerCorrect
  };
};

export const resetTasksState = () => {
  return {
    type: C.RESET_TASK_STATE
  };
};

export const setTaskLevelAC = level => {
  return {
    type: C.SET_TASK_LEVEL,
    level
  };
};
