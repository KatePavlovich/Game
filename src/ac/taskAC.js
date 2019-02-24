import {
  CHOOSE_TASK,
  ANSWER_TASK,
  CHECK_CORRECT_ANSWER,
  RESET_TASK_STATE
} from "../constants";

export const chooseTaskAC = () => {
  return {
    type: CHOOSE_TASK
  };
};

export const wasTaskAnsweredAC = () => {
  return {
    type: ANSWER_TASK
  };
};

export const checkCorrectAnswerAC = wasAnswerCorrect => {
  return {
    type: CHECK_CORRECT_ANSWER,
    wasAnswerCorrect
  };
};

export const resetTasksState = () => {
  return {
    type: RESET_TASK_STATE
  };
};
