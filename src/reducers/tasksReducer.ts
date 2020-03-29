import * as C from "../constants";

const initialState = {
  wasTaskAnswered: false,
  wasTaskChoosed: false,
  wasAnswerCorrect: false,
  level: "",
  showTasksModal: false
};

export type InitialStateType = typeof initialState;

const tasksReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case C.CHOOSE_TASK: {
      return {
        ...state,
        wasTaskChoosed: !state.wasTaskChoosed
      };
    }
    case C.ANSWER_TASK: {
      return {
        ...state,
        wasTaskAnswered: !state.wasTaskAnswered
      };
    }
    case C.CHECK_CORRECT_ANSWER: {
      return {
        ...state,
        wasAnswerCorrect: action.wasAnswerCorrect
      };
    }
    case C.RESET_TASK_STATE: {
      return {
        ...state,
        wasTaskAnswered: false,
        wasTaskChoosed: false,
        wasAnswerCorrect: false
      };
    }
    case C.SET_TASK_LEVEL: {
      return {
        ...state,
        level: action.level
      };
    }
    case C.SHOW_TASKS_MODAL: {
      return {
        ...state,
        showTasksModal: true
      };
    }
    case C.CLOSE_TASKS_MODAL: {
      return {
        ...state,
        showTasksModal: false
      };
    }

    default:
      return state;
  }
};

export default tasksReducer;
