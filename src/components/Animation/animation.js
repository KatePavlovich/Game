import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  moveAnimationThunk,
  resetAnimation,
  getAnimationInitialPosition
} from "../../ac/animationAC";
import { resetTasksState } from "../../ac/taskAC";
import { resetSpell } from "../../ac/spellAC";
import * as C from "../../constants";
// import store from "../../store";
import styles from "./Animation.module.scss";

class Animation extends PureComponent {
  constructor(props) {
    super(props);
    this.animationRef = React.createRef();
  }

  componentDidMount() {
    const { left } = this.animationRef.current.getBoundingClientRect();
    const position = [Math.round(left), 0];

    this.props.getAnimationInitialPosition(position);
  }

  componentDidUpdate(prevProps) {
    const {
      monsterLife,
      choosedSpell
      // monsterPosition: [monsterpositionX]
      // resetAnimation
    } = this.props;

    if (monsterLife < prevProps.monsterLife) {
      this.makeAnimation(choosedSpell);
    }
    // store.subscribe(() => {
    //   //       const {
    //   //   monsterPosition: [monsterpositionX],
    //   //   animationPosition: [animationPositionX, animationPositionY],
    //   //   resetAnimation
    //   // } = this.props;
    //   const [animationPositionX] = store.getState().animation.position;
    //   console.log("state", animationPositionX, monsterpositionX);
    //   this.stopAnimation(animationPositionX);
    // });
  }

  // componentWillUnmount() {
  //   this.setState({ timer: null });
  // }

  makeAnimation = sprite => {
    // const [monsterPositionX] = this.props.monsterPosition;
    const { moveAnimationThunk, resetTasksState, resetSpell } = this.props;

    moveAnimationThunk(sprite);

    resetTasksState();
    resetSpell();
    this.stopAnimation();
  };

  stopAnimation = () => {
    const { resetAnimation } = this.props;
    setTimeout(() => resetAnimation(), 3000);
  };

  render() {
    const {
      animationPosition: [animationPositionX, animationPositionY],
      spriteLocation,
      showAnimation,
      spriteIMG
    } = this.props;
    return (
      <div
        className={showAnimation ? styles.animation : styles.hideAnimation}
        style={{
          backgroundImage: `url(${spriteIMG})`,
          backgroundPosition: spriteLocation,
          top: `${animationPositionY}px`,
          // left: `${animationPositionX}px`,
          transform: `translateX(${animationPositionX}px)`,
          width: `${C.FIRE_SPRITE_WIDTH}px`,
          height: `${C.FIRE_SPRITE_HEIGHT}px`
        }}
        ref={this.animationRef}
      />
    );
  }
}

const mapStateToProps = state => ({
  animationPosition: state.animation.position,
  spriteLocation: state.animation.spriteLocation,
  showAnimation: state.animation.showAnimation,
  spriteIMG: state.animation.spriteIMG,
  choosedSpell: state.spell.choosedSpell,
  monsterLife: state.monster.monsterLife,
  monsterPosition: state.monster.position
});

const mapDispatchToProps = dispatch => ({
  moveAnimationThunk: sprite => {
    dispatch(moveAnimationThunk(sprite));
  },
  resetTasksState: () => {
    dispatch(resetTasksState());
  },
  resetSpell: () => {
    dispatch(resetSpell());
  },
  resetAnimation: positionY => {
    dispatch(resetAnimation(positionY));
  },
  getAnimationInitialPosition: position => {
    dispatch(getAnimationInitialPosition(position));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Animation);
