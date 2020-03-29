import React from "react";
import { connect } from "react-redux";
import { setPlayerOnLevelStart, movePlayer } from "../../ac/playerAC";
import { makeMonsterNameThunk, makeNewMonster } from "../../ac/monsterAC";
import { addTilesAC } from "../../ac/tilesAC";
import { tiles } from "../data/tiles";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import styles from "./ExitLevelModal.module.scss";
import { AppStateType } from "../../reducers";

type mapStateToPropsTypes = {
  isPlayerOnLevelExit: boolean;
};

type mapDispatchToPropsTypes = {
  setPlayerOnLevelStart: () => void;
  addTiles: (tiles: number[][]) => void;
  movePlayer: (
    position: number[],
    walkIndex: number,
    spriteLOcation: string
  ) => {
    type: String;
    position: number[];
    walkIndex: Number;
    spriteLocation: String;
  };
  makeMonsterName: () => void;
  makeNewMonster: (
    monsterLife: Number,
    monsterName: String
  ) => {
    type: String;
    monsterLife: Number;
    monsterName: String;
  };
};

type ExitLevelModalProps = {
  isPlayerOnLevelExit: boolean;
  setPlayerOnLevelStart: () => void;
  addTiles: (tiles: number[][]) => void;
  movePlayer: (
    position: number[],
    walkIndex: number,
    spriteLOcation: string
  ) => void;
  makeMonsterName: () => void;
  makeNewMonster: () => void;
};

const ExitLevelModal = ({
  isPlayerOnLevelExit,
  setPlayerOnLevelStart,
  addTiles,
  movePlayer,
  makeMonsterName,
  makeNewMonster
}: ExitLevelModalProps) => {
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

const mapStateToProps = (state: AppStateType) => ({
  isPlayerOnLevelExit: state.player.isPlayerOnLevelExit
});

const mapDispatchToProps = (dispatch: any) => ({
  setPlayerOnLevelStart: () => dispatch(setPlayerOnLevelStart()),
  addTiles: (tiles: number[][]) => dispatch(addTilesAC(tiles)),
  movePlayer: (position: number[], walkIndex: number, spriteLOcation: string) =>
    dispatch(movePlayer(position, walkIndex, spriteLOcation)),
  makeMonsterName: () => dispatch(makeMonsterNameThunk()),
  makeNewMonster: () => dispatch(makeNewMonster())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExitLevelModal);
