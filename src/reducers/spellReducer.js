const initialState = {
  isSpellChoosen: false,
  choosedSpell: "",
  showSpellModal: false
};

const spellReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHOOSE_SPELL": {
      return {
        ...state,
        isSpellChoosen: !state.isSpellChoosen,
        choosedSpell: action.choosedSpell
      };
    }
    case "SHOW_SPELLMODAL": {
      return {
        ...state,
        isSpellChoosen: false,
        showSpellModal: true
      };
    }
    case "CLOSE_SPELLMODAL": {
      return {
        ...state,
        showSpellModal: false
      };
    }
    case "RESET_SPELL": {
      return {
        ...state,
        isSpellChoosen: false,
        choosedSpell: "",
        showSpellModal: false
      };
    }

    default:
      return state;
  }
};

export default spellReducer;
