import React, { Component } from "react";
import { connect } from "react-redux";
import { Player } from "../../components/Player";
import { Monster } from "../../components/Monster";
import { Map } from "../../components/Map";
import { TasksScreen } from "../TasksScreen";
import { movePlayer } from "../../ac";
import { makeMonsterNameThunk, makeNewMonster } from "../../ac/monsterAC";
import { Score } from "../Score";
import { tiles } from "../../components/data/tiles.js";
import { LifeBar } from "../../components/LifeBar";
import { addTilesAC, changeTilesThunk } from "../../ac/tilesAC";
import { ExitLevelModal } from "../../components/ExitLevelModal";
import { chooseTaskAC } from "../../ac/taskAC";
import { closeTasksModalAC } from "../../ac/tasksModalAC";
import styles from "./LevelsMap.module.scss";

class LevelsMap extends Component {
  state = {
    bangSound: new Audio(
      "https://freesound.org/data/previews/33/33245_65091-lq.mp3"
    )
  };

  componentDidMount() {
    this.props.addTilesAC(tiles);
    this.props.movePlayer([0, 0], 0, "0px 0px");
    this.props.chooseTaskAC();

    if (!this.props.isPlayerOnLevelExit) {
      this.props.makeMonsterNameThunk();
      this.props.makeNewMonster();
    }
  }

  componentDidUpdate(prevProps) {
    const { monsterLife } = this.props;

    if (monsterLife === 0) {
      this.nextLevel();
    }
  }

  nextLevel = () => {
    this.state.bangSound.play();
    this.props.dispatch(changeTilesThunk());
  };

  render() {
    const { playerLife, monsterLife, isPlayerOnLevelExit } = this.props;
    return playerLife === 0 ? (
      <div>
        <Score />
      </div>
    ) : (
      <div>
        <LifeBar />
        <div className={styles.gameScreenContainer}>
          <div className={styles.mapWrapper}>
            <Map />
            <Player />
            <Monster />
          </div>
        </div>
        <TasksScreen />
        {monsterLife === 0 && <span className={styles.blink} />}
        {isPlayerOnLevelExit && monsterLife === 0 && <ExitLevelModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monsterLife: state.monster.monsterLife,
  playerLife: state.player.playerLife,
  isPlayerOnLevelExit: state.player.isPlayerOnLevelExit
});

const mapDispatchToProps = dispatch => ({
  addTilesAC: name => {
    dispatch(addTilesAC(name));
  },
  movePlayer: (position, walkIndex, spriteLocation) => {
    dispatch(movePlayer(position, walkIndex, spriteLocation));
  },
  chooseTaskAC: () => {
    dispatch(chooseTaskAC());
  },
  makeMonsterNameThunk: () => {
    dispatch(makeMonsterNameThunk());
  },
  makeNewMonster: () => {
    dispatch(makeNewMonster());
  },
  closeTasksModalAC: () => {
    dispatch(closeTasksModalAC());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsMap);
