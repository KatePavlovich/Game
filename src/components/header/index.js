import React from 'react';
import { connect } from 'react-redux';
import { openModalAC } from '../../ac/modalAC';
import { ActiveMenuLink } from '../activeLink';
import './index.css';
import ModalSpell from '../modalSpell';
import SpellBook from '../SpellBook/spellBook';
import store from '../../store';
import { isLoggedOut } from '../../ac';
import { withRouter } from 'react-router';

const Header = ({ showSpellModal, showModalSpell, isLoggedIn, history }) => {
  const handleLogout = () => {
    store.dispatch(isLoggedOut());
    history.push('/');
  };

  return (
    <ul className="header__ul">
      <li>
        <ActiveMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
      </li>
      <SpellBook showModalSpell={showModalSpell} />
      {showSpellModal && <ModalSpell />}
      <li>
        <ActiveMenuLink to="/score" label="Score" />
      </li>
      {isLoggedIn === true ? (
        <li className="nav-link" onClick={handleLogout}>
          Logout
        </li>
      ) : (
        <li>
          <ActiveMenuLink to="/login" label="Login" />
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    showSpellModal: state.spell.showSpellModal,
    isLoggedIn: state.player.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => ({
  showModalSpell: () => {
    dispatch(openModalAC());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
