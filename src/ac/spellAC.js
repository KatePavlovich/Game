import { CHOOSE_SPELL, RESET_SPELL } from "../constants";

export const chooseSpellAC = choosedSpell => {
  return {
    type: CHOOSE_SPELL,
    choosedSpell
  };
};

export const resetSpell = () => {
  return {
    type: RESET_SPELL
  };
};
