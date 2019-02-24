import React, { Component } from "react";
import { connect } from "react-redux";
import { openModalAC } from "../../ac/modalAC";
import { ActiveMenuLink } from "../activeLink";
import "./index.css";
import ModalSpell from "../modalSpell";
import SpellBook from "../SpellBook/spellBook";

class Header extends Component {
  render() {
    const { showSpellModal, showModalSpell } = this.props;
    return (
      <ul className="header__ul">
        <li>
          <ActiveMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
        </li>
        <SpellBook showModalSpell={showModalSpell} />
        {showSpellModal && <ModalSpell />}
        <li>
          <ActiveMenuLink to="/Score" label="Score" />
        </li>
        <li>
          <ActiveMenuLink to="/Login" label="Login" />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  showSpellModal: state.spell.showSpellModal
});

const mapDispatchToProps = dispatch => ({
  showModalSpell: () => {
    dispatch(openModalAC());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
