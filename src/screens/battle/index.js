import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Player from '../../components/player';
import Monster from '../../components/monster';
import Map from '../../components/map/map';
import TasksScreen from '../tasksScreen/tasksScreen';
import {
  makeMonsterNameThunk,
  reduceMonsterLife,
  reducePlayerLife,
  makeNewMonster,
  movePlayer
} from '../../ac';
import { resetSpell } from '../../ac/spellAC';
import { resetTasksState } from '../../ac/taskAC';
import { moveAnimationThunk, resetAnimation } from '../../ac/animationAC';
import Score from '../score';
import tiles from '../../components/data/tiles.js';
import ProgressBar from '../../components/progressBar/progressBar';
import { addTilesAC, changeTilesThunk } from '../../ac/tilesAC';
import SimpleMath from '../../components/tasks/simpleMath';
import Animation from '../../components/Animation/animation';
import ExitLevelModal from '../../components/ExitLevelModal';

class Battle extends Component {
  state = {
    failureaudio: new Audio(
      'https://freesound.org/data/previews/131/131891_2398403-lq.mp3'
    ),
    winaudio: new Audio(
      'https://freesound.org/data/previews/181/181425_1823830-lq.mp3'
    ),
    bangSound: new Audio(
      'https://freesound.org/data/previews/33/33245_65091-lq.mp3'
    )
  };

  playAudio = audio => {
    const { failureaudio, winaudio } = this.state;
    if (audio === false) {
      failureaudio.play();
    } else winaudio.play();
  };

  componentDidMount() {
    this.props.dispatch(addTilesAC(tiles));
    this.props.dispatch(movePlayer([0, 0], 0, '0px 0px'));

    if (!this.props.isPlayerOnLevelExit) {
      this.props.dispatch(makeMonsterNameThunk());
      this.props.dispatch(makeNewMonster());
    }
  }

  componentDidUpdate(prevProps) {
    const {
      monsterLife,
      wasTaskAnswered,
      wasAnswerCorrect,
      choosedSpell
    } = this.props;

    if (
      wasTaskAnswered !== prevProps.wasTaskAnswered &&
      wasTaskAnswered === true
    ) {
      if (wasAnswerCorrect === true) {
        this.makeAnimation(choosedSpell);
        this.props.dispatch(reduceMonsterLife());
      }
      if (wasAnswerCorrect === false) {
        this.makeAnimation();
        this.props.dispatch(reducePlayerLife());
      }
    }
    if (monsterLife === 0) {
      this.nextLevel();
    }
  }

  makeAnimation = sprite => {
    const { wasAnswerCorrect } = this.props;
    this.props.dispatch(moveAnimationThunk(sprite));
    this.playAudio(wasAnswerCorrect);
    this.props.dispatch(resetTasksState());
    this.props.dispatch(resetSpell());
    this.stopAnimation();
  };

  stopAnimation = () => {
    setTimeout(() => this.props.dispatch(resetAnimation()), 3000);
  };

  nextLevel = () => {
    this.state.bangSound.play();
    this.props.dispatch(changeTilesThunk());
  };

  render() {
    const {
      isSpellChoosen,
      playerLife,
      monsterLife,
      monsterName,
      playerName,
      wasTaskChoosed,
      isPlayerOnLevelExit
    } = this.props;
    return playerLife === 0 ? (
      <div>
        <Score />
      </div>
    ) : (
      <div>
        <header className="header">
          <div className="lifes__container">
            <div className="lifes--player">
              <h3 className="lifes__title">{playerName}</h3>
              <span>player life: {playerLife} hp</span>
              <ProgressBar percentage={playerLife} />
            </div>
            <div className="lifes--monster">
              <h3 className="lifes__title">{monsterName}</h3>
              <span>monster life: {monsterLife} hp</span>
              <ProgressBar percentage={monsterLife} />
            </div>
          </div>
        </header>
        <div className="gameScreen__container">
          <div className="map__wrapper">
            <Map />
            <Player />
            <Animation />
            <Monster />
          </div>
        </div>
        {isSpellChoosen && <TasksScreen />}
        {wasTaskChoosed && <SimpleMath />}
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
  monsterName: state.monster.monsterName,
  playerName: state.player.playerName,
  wasTaskChoosed: state.tasks.wasTaskChoosed,
  wasAnswerCorrect: state.tasks.wasAnswerCorrect,
  wasTaskAnswered: state.tasks.wasTaskAnswered,
  isPlayerOnLevelExit: state.player.isPlayerOnLevelExit
});
export default connect(mapStateToProps)(Battle);
