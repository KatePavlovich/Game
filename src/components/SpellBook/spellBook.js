import React, { Component } from "react";
import styles from "./SpellBook.module.scss";

class SpellBook extends Component {
  state = {
    spriteLocation: "0px 0px",
    walkIndex: 0,
    timer: null
  };

  startBookAnimation = () => {
    this.setState({
      timer: setInterval(() => {
        this.setState({
          spriteLocation: `-${64 * this.state.walkIndex}px 0px`,
          walkIndex: this.state.walkIndex >= 8 ? 0 : this.state.walkIndex + 1
        });
      }, 100)
    });
  };

  stopBookAnimation = () => {
    this.setState({
      spriteLocation: "0px 0px",
      walkIndex: 0,
      timer: clearInterval(this.state.timer)
    });
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
