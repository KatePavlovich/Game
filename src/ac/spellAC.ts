import * as C from "../constants";
import { SpellType } from "../store/spell/types";

export const chooseSpellAC = (choosedSpell: string): SpellType => {
  return {
    type: C.CHOOSE_SPELL,
    choosedSpell
  };
};

export const resetSpell = (): SpellType => {
  return {
    type: C.RESET_SPELL
  };
};
