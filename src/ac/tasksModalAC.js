import * as C from "../constants";

export const openTasksModalAC = () => {
  return {
    type: C.SHOW_TASKS_MODAL
  };
};

export const closeTasksModalAC = () => {
  return {
    type: C.CLOSE_TASKS_MODAL
  };
};
