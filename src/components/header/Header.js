import React from "react";
import { connect } from "react-redux";
import { openModalAC } from "../../ac/modalAC";
import { toggleSound } from "../../ac";
import { ActiveMenuLink } from "../activeLink";
import { SpellModal } from "../modalSpell";
import { SpellBook } from "../SpellBook";
import store from "../../store";
import { isLoggedOut } from "../../ac";
import { withRouter } from "react-router";
import classNames from "classnames";
import styles from "./Header.module.scss";

const Header = ({
  showSpellModal,
  showModalSpell,
  isLoggedIn,
  history,
  toggleSound,
  sound: { sound }
}) => {
  const handleLogout = () => {
    store.dispatch(isLoggedOut());
    history.push("/");
  };
  return (
    <header className={styles.header}>
      <ul className={styles.headerUl}>
        <li>
          <ActiveMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
        </li>
        <SpellBook showModalSpell={showModalSpell} />
        {showSpellModal && <SpellModal />}
        <li>
          <ActiveMenuLink to="/score" label="Score" />
        </li>
        {isLoggedIn === true ? (
          <li className={styles.navLink} onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <li>
            <ActiveMenuLink to="/login" label="Login" />
          </li>
        )}
        <span
          className={classNames(styles.sound, { [styles.soundMute]: !sound })}
          onClick={toggleSound}
        />
      </ul>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    showSpellModal: state.spell.showSpellModal,
    isLoggedIn: state.player.isLoggedIn,
    sound: state.sound
  };
};

const mapDispatchToProps = dispatch => ({
  showModalSpell: () => {
    dispatch(openModalAC());
  },
  toggleSound: () => {
    dispatch(toggleSound());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
