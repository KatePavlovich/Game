import React from "react";
import { connect } from "react-redux";
import { openModalAC } from "../../ac/spellModalAC";
import { openTasksModalAC } from "../../ac/tasksModalAC";
import { isLoggedOut } from "../../ac/playerAC";
import { toggleSound } from "../../ac/gameAC";
import { ActiveLink } from "../ActiveLink";
import { SpellModal } from "../modalSpell";
import { SpellBook } from "../SpellBook";

import store from "../../store";
import { withRouter } from "react-router";
import * as C from "../../constants";
import * as T from "../../constants/translation";
import classNames from "classnames";
import styles from "./Header.module.scss";

const Header = ({
  showSpellModal,
  showModalSpell,
  isLoggedIn,
  history,
  toggleSound,
  openTasksModalAC,
  sound: { sound },
  ...props
}) => {
  const handleLogout = () => {
    store.dispatch(isLoggedOut());
    history.push("/");
  };

  const showTasksButton = props.location.pathname === C.LEVELS_MAP;
  const showSpellButton = props.location.pathname.includes(C.TASKS_PATH);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <ActiveLink activeOnlyWhenExact={true} to="/" label="Home" />

        <ul className={styles.headerUl}>
          {showTasksButton && (
            <li
              className={styles.swords}
              onClick={openTasksModalAC}
              title={T.CHOOSE_TASK}
            ></li>
          )}
          {showSpellButton && (
            <li title={T.CHOOSE_SPELL}>
              <SpellBook showModalSpell={showModalSpell} />
              <SpellModal />
            </li>
          )}
          <li title={T.SCORE}>
            <ActiveLink to="/score" label="Score" />
          </li>
          {isLoggedIn === true ? (
            <li className="navLink" onClick={handleLogout} title={T.LOGOUT}>
              Logout
            </li>
          ) : (
            <li title={T.LOGIN}>
              <ActiveLink to="/login" label="Login" />
            </li>
          )}
          <li
            className={classNames(styles.sound, {
              [styles.soundMute]: !sound
            })}
            onClick={toggleSound}
            title={!sound ? T.TURN_ON_SOUND : T.TURN_OFF_SOUND}
          ></li>
        </ul>
      </div>
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
  },
  openTasksModalAC: () => {
    dispatch(openTasksModalAC());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
