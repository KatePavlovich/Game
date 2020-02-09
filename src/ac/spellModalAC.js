import { SHOW_SPELLMODAL, CLOSE_SPELLMODAL } from "../constants";

export const openModalAC = () => {
  return {
    type: SHOW_SPELLMODAL
  };
};

export const closeModalAC = () => {
  return {
    type: CLOSE_SPELLMODAL
  };
};
