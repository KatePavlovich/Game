import { InitialStateType, SpellType } from "../store/spell/types";
import * as C from "../constants";

const initialState: InitialStateType = {
  isSpellChoosen: false,
  choosedSpell: "",
  showSpellModal: false
};

const spellReducer = (
  state = initialState,
  action: SpellType
): InitialStateType => {
  switch (action.type) {
    case C.CHOOSE_SPELL: {
      return {
        ...state,
        isSpellChoosen: !state.isSpellChoosen,
        choosedSpell: action.choosedSpell
      };
    }
    case C.SHOW_SPELLMODAL: {
      return {
        ...state,
        isSpellChoosen: false,
        showSpellModal: true
      };
    }
    case C.CLOSE_SPELLMODAL: {
      return {
        ...state,
        showSpellModal: false
      };
    }
    case C.RESET_SPELL: {
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
