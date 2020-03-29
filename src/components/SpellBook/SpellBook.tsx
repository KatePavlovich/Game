import React, { Component } from "react";
import * as C from "../../constants";
import styles from "./SpellBook.module.scss";

type SpellBookProps = {
  showModalSpell: any;
};

type SpellBookState = {
  spriteLocation: string;
  walkIndex: number;
  timer: any;
};

class SpellBook extends Component<SpellBookProps, SpellBookState> {
  state = {
    spriteLocation: "0px 0px",
    walkIndex: 0,
    timer: null
  };

  startBookAnimation = () => {
    const { walkIndex } = this.state;
    this.setState({
      timer: setInterval(() => {
        this.setState({
          spriteLocation: `-${C.SPELL_SPRITE_WIDTH * walkIndex}px 0px`,
          walkIndex: walkIndex >= C.SPELL_SPRITE_LENGTH ? 0 : walkIndex + 1
        });
      }, 100)
    });
  };

  stopBookAnimation = () => {
    this.setState(state => ({
      spriteLocation: "0px 0px",
      walkIndex: 0,
      timer: clearInterval(state.timer)
    }));
  };

  render() {
    return (
      <div
        className={styles.button}
        onClick={this.props.showModalSpell}
        onMouseOver={this.startBookAnimation}
        onMouseOut={this.stopBookAnimation}
        style={{
          backgroundPosition: this.state.spriteLocation
        }}
      />
    );
  }
}

export { SpellBook };
