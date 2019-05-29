import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import { isLoggedOut} from "../../ac";
import history from "../../history";
import { openModalAC } from "../../ac/modalAC";
import { ActiveMenuLink } from "../activeLink";
import "./index.css";
import ModalSpell from "../modalSpell";
import SpellBook from "../SpellBook/spellBook";

class Header extends Component {

  handleLogout = ()=> {
    store.dispatch(isLoggedOut());
    history.push("/");
  }

  render() {
    const { showSpellModal, showModalSpell, isLoggedIn } = this.props;
    return (
      <ul className="header__ul">
        <li>
          <ActiveMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
        </li>
        {isLoggedIn &&
        <>
        <SpellBook showModalSpell={showModalSpell} />
        {showSpellModal && <ModalSpell />}
        </>
        }
        <li>
          <ActiveMenuLink to="/Score" label="Score" />
        </li>
        {isLoggedIn ?  <li>
          <div  onClick={this.handleLogout} >Logout</div>
        </li> : 
        <li>
          <ActiveMenuLink to="/Login" label="Login" />
        </li>}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  showSpellModal: state.spell.showSpellModal,
  isLoggedIn: state.player.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  showModalSpell: () => {
    dispatch(openModalAC());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
