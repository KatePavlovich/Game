import React, { PureComponent } from "react";
import * as C from "../../constants";
import * as S from "../../constants/stringValues";
import { connect } from "react-redux";
import { getStaticAnimationSprite } from "../../helpers/getStaticAnimationSprite";
import { showStaticAnimation } from "../../ac/animationAC";
import { resetSpell } from "../../ac/spellAC";
import styles from "./StaticAnimation.module.scss";

class StaticAnimation extends PureComponent {
  state = {
    spriteLocation: C.BASIC_SPRITE_LOCATION,
    walkIndex: C.BASIC_WALKINDEX,
    top: 0,
    left: 0,
    width: "",
    height: "",
    background: "",
    backgroundPositionY: "",
    spriteLength: "",
  };

  prepareAndPlayAnimation = async (choosedSpell) => {
    const {
      top,
      left,
      width,
      height,
      background,
      backgroundPositionY,
      spriteLength,
    } = await getStaticAnimationSprite(choosedSpell);

    this.setState({
      top,
      left,
      width,
      height,
      background,
      spriteLocation: `-${
        width * this.state.walkIndex
      }px -${backgroundPositionY}px`,
      spriteLength,
      backgroundPositionY,
    });

    this.timerHandle = setInterval(this.makeAnimation, 100);
  };

  makeAnimation = () => {
    const { spriteLength, backgroundPositionY, width, walkIndex } = this.state;

    if (walkIndex === spriteLength) this.stopAnimation();
    this.setState({
      spriteLocation: `-${width * walkIndex}px -${backgroundPositionY}px`,
      walkIndex: walkIndex > spriteLength ? 0 : walkIndex + 1,
    });
  };

  stopAnimation = () => {
    clearInterval(this.timerHandle);
    this.props.showStaticAnimationFunc();
    this.props.resetSpell();
  };

  componentDidUpdate(prevProps) {
    const { showStaticAnimation, choosedSpell } = prevProps;
    if (
      this.props.showStaticAnimation !== showStaticAnimation &&
      this.props.showStaticAnimation === true
    ) {
      this.prepareAndPlayAnimation(choosedSpell);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerHandle);
  }

  render() {
    const { spriteLocation, top, left, width, height, background } = this.state;
    const { showStaticAnimation } = this.props;
    return (
      <div
        className={styles.animation}
        style={{
          backgroundPosition: spriteLocation,
          top,
          left,
          width: `${width}px`,
          height: `${height}px`,
          background,
          display: showStaticAnimation ? S.BLOCK : S.NONE,
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  choosedSpell: state.spell.choosedSpell,
  showStaticAnimation: state.animation.showStaticAnimation,
  wasAnswerCorrect: state.tasks.wasAnswerCorrect,
});

const mapDispatchToProps = (dispatch) => ({
  showStaticAnimationFunc: () => {
    dispatch(showStaticAnimation());
  },
  resetSpell: () => {
    dispatch(resetSpell());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StaticAnimation);
