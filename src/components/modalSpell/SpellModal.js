import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseSpellAC, resetSpell } from "../../ac/spellAC";
import { closeModalAC } from "../../ac/spellModalAC";
import { Modal } from "antd";
import styles from "./SpellModal.module.scss";
import leaf from "./img/leaf-acid-3.png";
import wind from "./img/wind-blue-3.png";
import health from "./img/heal-royal-3.png";
import armor from "./img/protect-royal-3.png";
import * as C from "../../constants";
import * as T from "../../constants/translation";

const SpellModal = () => {
  const showSpellModal = useSelector(state => state.spell.showSpellModal);
  const dispatch = useDispatch();

  const setSpellToStore = e => {
    dispatch(chooseSpellAC(e.currentTarget.dataset.spell));
    dispatch(closeModalAC());
  };
  const cancelModal = () => {
    dispatch(closeModalAC());
    dispatch(resetSpell());
  };

  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
    justifyItems: "center"
  };

  return (
    <Modal
      title={T.CHOOSE_SPELL}
      visible={showSpellModal}
      closable={false}
      bodyStyle={style}
      onCancel={cancelModal}
    >
      <img
        className={styles.spellImg}
        src={wind}
        onClick={setSpellToStore}
        alt={T.WIND_SPELL}
        data-spell={C.FIRE}
        title={T.WIND_SPELL}
      />
      <img
        className={styles.spellImg}
        src={leaf}
        onClick={setSpellToStore}
        alt={T.GREEN_FIRE_SPELL}
        data-spell={C.LEAF}
        title={T.GREEN_FIRE_SPELL}
      />
      <img
        className={styles.spellImg}
        src={health}
        onClick={setSpellToStore}
        alt={T.HEALTH_SPELL}
        data-spell={C.HEALTH}
        title={T.HEALTH_SPELL}
      />
      <img
        className={styles.spellImg}
        src={armor}
        onClick={setSpellToStore}
        alt={T.ARMOR_SPELL}
        data-spell={C.ARMOR}
        title={T.ARMOR_SPELL}
      />
    </Modal>
  );
};

export { SpellModal };
