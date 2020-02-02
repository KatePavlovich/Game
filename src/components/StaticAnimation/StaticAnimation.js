import React, { PureComponent } from "react";
import * as C from "../../constants";
import * as S from "../../constants/stringValues";
import { connect } from "react-redux";
import { getStaticAnimationSprite } from "../../helpers/getStaticAnimationSprite";
import styles from "./StaticAnimation.module.scss";

class StaticAnimation extends PureComponent {
  state = {
    spriteLocation: C.BASIC_SPRITE_LOCATION,
    walkIndex: C.BASIC_WALKINDEX,
    top: "0px",
    left: "0px",
    width: "",
    height: "",
    background: "",
    backgroundPositionY: "",
    spriteLength: "",
    showAnimation: false
  };

  makeAnimation = () => {
    const { spriteLength, backgroundPositionY, width, walkIndex } = this.state;

    if (walkIndex === spriteLength) this.stopAnimation();
    this.setState({
      spriteLocation: `-${width * walkIndex}px -${backgroundPositionY}px`,
      walkIndex: walkIndex > spriteLength ? 0 : walkIndex + 1
    });
  };

  stopAnimation = () => {
    clearInterval(this.timerHandle);
    this.setState({ showAnimation: false });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.monsterLife < prevProps.monsterLife &&
      (this.props.choosedSpell === C.HEALTH ||
        this.props.choosedSpell === C.ARMOR)
    ) {
      const {
        top,
        left,
        width,
        height,
        background,
        backgroundPositionY,
        spriteLength
      } = getStaticAnimationSprite(this.props.choosedSpell);

      this.setState({
        top,
        left,
        width,
        height,
        background,
        spriteLocation: `-${width *
          this.state.walkIndex}px -${backgroundPositionY}px`,
        spriteLength,
        backgroundPositionY,
        showAnimation: true
      });

      this.timerHandle = setInterval(this.makeAnimation, 100);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerHandle);
  }

  render() {
    const {
      spriteLocation,
      top,
      left,
      width,
      height,
      background,
      showAnimation
    } = this.state;
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
          display: showAnimation ? S.BLOCK : S.NONE
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  choosedSpell: state.spell.choosedSpell,
  playerPosition: state.player.position,
  monsterLife: state.monster.monsterLife
});

export default connect(mapStateToProps)(StaticAnimation);
