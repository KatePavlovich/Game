import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseSpellAC } from "../../ac/spellAC";
import { closeModalAC } from "../../ac/modalAC";
import { Modal } from "antd";
import "./index.css";
import leaf from "./img/leaf-acid-3.png";
import wind from "./img/wind-blue-3.png";

class Spell extends Component {
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
          className="spell__img"
          src={wind}
          onClick={this.setSpellToStore}
          alt="wind-spell"
          data-spell="fire"
        />
        <img
          className="spell__img"
          src={leaf}
          onClick={this.setSpellToStore}
          alt="leaf-spell"
          data-spell="leaf"
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isSpellChoosen: state.spell.isSpellChoosen,
  showSpellModal: state.spell.showSpellModal
});

export default connect(mapStateToProps)(Spell);
