const initialState = {
  wasTaskAnswered: false,
  wasTaskChoosed: false,
  wasAnswerCorrect: false
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHOOSE_TASK": {
      return {
        ...state,
        wasTaskChoosed: !state.wasTaskChoosed
      };
    }
    case "ANSWER_TASK": {
      return {
        ...state,
        wasTaskAnswered: !state.wasTaskAnswered
      };
    }
    case "CHECK_CORRECT_ANSWER": {
      return {
        ...state,
        wasAnswerCorrect: action.wasAnswerCorrect
      };
    }
    case "RESET_TASK_STATE": {
      return {
        ...state,
        wasTaskAnswered: false,
        wasTaskChoosed: false,
        wasAnswerCorrect: false
      };
    }

    default:
      return state;
  }
};

export default tasksReducer;
