import React from "react";
import { connect } from "react-redux";
import { setPlayerOnLevelStart, movePlayer } from "../../ac/playerAC";
import { makeMonsterNameThunk, makeNewMonster } from "../../ac/monsterAC";
import { addTilesAC } from "../../ac/tilesAC";
import { tiles } from "../data/tiles.js";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import styles from "./ExitLevelModal.module.scss";

const ExitLevelModal = ({
  isPlayerOnLevelExit,
  setPlayerOnLevelStart,
  addTiles,
  movePlayer,
  makeMonsterName,
  makeNewMonster
}) => {
  const startNewBattle = () => {
    addTiles(tiles);
    movePlayer([0, 0], 0, "0px 0px");
    makeMonsterName();
    makeNewMonster();
    setPlayerOnLevelStart();
  };
  return (
    <Modal
      title="Choose"
      visible={isPlayerOnLevelExit}
      closable={false}
      maskClosable={false}
      bodyStyle={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "1rem",
        justifyItems: "center"
      }}
    >
      <Link className={styles.buttons} to="/" onClick={setPlayerOnLevelStart}>
        Home
      </Link>
      <Link
        className={styles.buttons}
        to="/score"
        onClick={setPlayerOnLevelStart}
      >
        Score
      </Link>
      <div className={styles.buttons} onClick={startNewBattle}>
        Play again
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isPlayerOnLevelExit: state.player.isPlayerOnLevelExit
});

const mapDispatchToProps = dispatch => ({
  setPlayerOnLevelStart: () => dispatch(setPlayerOnLevelStart()),
  addTiles: tiles => dispatch(addTilesAC(tiles)),
  movePlayer: (position, walkIndex, spriteLOcation) =>
    dispatch(movePlayer(position, walkIndex, spriteLOcation)),
  makeMonsterName: () => dispatch(makeMonsterNameThunk()),
  makeNewMonster: () => dispatch(makeNewMonster())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExitLevelModal);
