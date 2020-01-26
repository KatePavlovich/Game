import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { Player } from "../../components/player";
import { Monster } from "../../components/monster";
import Map from "../../components/map/map";
import { TasksScreen } from "../tasksScreen/tasksScreen";
import { makeMonsterNameThunk, makeNewMonster, movePlayer } from "../../ac";
import Score from "../score";
import tiles from "../../components/data/tiles.js";
import { LifeBar } from "../../components/LifeBar/LifeBar";
import { addTilesAC, changeTilesThunk } from "../../ac/tilesAC";
import ExitLevelModal from "../../components/ExitLevelModal";
import { chooseTaskAC } from "../../ac/taskAC";

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
    const {
      playerLife,
      monsterLife,
      wasTaskChoosed,
      isPlayerOnLevelExit
    } = this.props;
    return playerLife === 0 ? (
      <div>
        <Score />
      </div>
    ) : (
      <div>
        <LifeBar />
        <div className="gameScreen__container">
          <div className="map__wrapper">
            <Map />
            <Player />
            <Monster />
          </div>
        </div>
        <TasksScreen wasTaskChoosed={wasTaskChoosed} />
        {monsterLife === 0 && <span className="blink" />}
        {isPlayerOnLevelExit && monsterLife === 0 && <ExitLevelModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSpellChoosen: state.spell.isSpellChoosen,
  choosedSpell: state.spell.choosedSpell,
  monsterLife: state.monster.monsterLife,
  playerLife: state.player.playerLife,
  wasTaskChoosed: state.tasks.wasTaskChoosed,
  wasAnswerCorrect: state.tasks.wasAnswerCorrect,
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelsMap);
