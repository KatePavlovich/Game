import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseSpellAC } from "../../ac/spellAC";
import { closeModalAC } from "../../ac/modalAC";
import { Modal } from "antd";
import styles from "./SpellModal.module.scss";
import leaf from "./img/leaf-acid-3.png";
import wind from "./img/wind-blue-3.png";
import health from "./img/heal-royal-3.png";
import armor from "./img/protect-royal-3.png";
import * as C from "../../constants";

class SpellModal extends Component {
  handleOk() {
    this.props.dispatch(closeModalAC());
  }

  setSpellToStore = e => {
    let action = chooseSpellAC();
    this.props.dispatch(chooseSpellAC(e.currentTarget.dataset.spell));
    this.handleOk(!action);
  };

  render() {
    const { showSpellModal } = this.props;
    return (
      <Modal
        title="Choose spell"
        visible={showSpellModal}
        closable={false}
        maskClosable={false}
        bodyStyle={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1rem",
          justifyItems: "center"
        }}
      >
        <img
          className={styles.spellImg}
          src={wind}
          onClick={this.setSpellToStore}
          alt="wind-spell"
          data-spell={C.FIRE}
          title={C.FIRE_TOOLTIP}
        />
        <img
          className={styles.spellImg}
          src={leaf}
          onClick={this.setSpellToStore}
          alt="leaf-spell"
          data-spell={C.LEAF}
          title={C.FIRE_TOOLTIP}
        />
        <img
          className={styles.spellImg}
          src={health}
          onClick={this.setSpellToStore}
          alt="health-spell"
          data-spell={C.HEALTH}
          title={C.HEALTH_TOOLTIP}
        />
        <img
          className={styles.spellImg}
          src={armor}
          onClick={this.setSpellToStore}
          alt="armor-spell"
          data-spell={C.ARMOR}
          title={C.ARMOR_TOOLTIP}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isSpellChoosen: state.spell.isSpellChoosen,
  showSpellModal: state.spell.showSpellModal
});

export default connect(mapStateToProps)(SpellModal);
