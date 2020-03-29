import * as C from "../../constants";

const initialState = {
  isSpellChoosen: false as boolean,
  choosedSpell: "" as string,
  showSpellModal: false as boolean
};

export type InitialStateType = typeof initialState;

interface chooseSpellType {
  type: typeof C.CHOOSE_SPELL;
  choosedSpell: string;
}

interface resetSpellType {
  type: typeof C.RESET_SPELL;
}

interface showSpellModal {
  type: typeof C.SHOW_SPELLMODAL;
}

interface closeSpellModal {
  type: typeof C.CLOSE_SPELLMODAL;
}

export type SpellType =
  | chooseSpellType
  | resetSpellType
  | showSpellModal
  | closeSpellModal;
