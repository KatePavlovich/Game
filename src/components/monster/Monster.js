import React, { PureComponent } from "react";
import * as C from "../../constants";
import { connect } from "react-redux";
import { makeMonsterNameThunk } from "../../ac";
import styles from "./Monster.module.scss";

class Monster extends PureComponent {
  state = {
    spriteLocation: C.BASIC_SPRITE_LOCATION,
    walkIndex: C.BASIC_WALKINDEX,
    timer: null
  };

  makeMonsterHurtAnimation = () => {
    this.setState({
      timer: setInterval(() => {
        if (this.state.walkIndex === 3) {
          this.timerHandle = setTimeout(() => {
            this.stopMonsterAnimation();
            this.timerHandle = 0;
          }, 3000);
          return;
        }
        this.setState({
          spriteLocation: `-${C.MONSTER_SPRITE_WIDTH *
            this.state.walkIndex}px -${C.MONSTER_SPRITE_HEIGHT}px`,
          walkIndex: this.state.walkIndex > 4 ? 0 : this.state.walkIndex + 1
        });
      }, 100)
    });
  };

  stopMonsterAnimation = () => {
    this.setState({
      spriteLocation: C.BASIC_SPRITE_LOCATION,
      walkIndex: C.BASIC_WALKINDEX,
      timer: clearInterval(this.state.timer)
    });
  };

  componentDidMount() {
    this.props.dispatch(makeMonsterNameThunk());
  }

  componentDidUpdate(prevProps) {
    if (this.props.monsterLife < prevProps.monsterLife) {
      this.makeMonsterHurtAnimation();
    }
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const { spriteLocation } = this.state;
    return (
      <div
        className={styles.monster}
        style={{
          backgroundPosition: spriteLocation
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  monsterLife: state.monster.monsterLife
});

export default connect(mapStateToProps)(Monster);
