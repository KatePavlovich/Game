import React, { Component } from "react";
import { connect } from "react-redux";
import { movePlayerThunk, resetPlayerPosition } from "../../ac";
import { StaticAnimation } from "../StaticAnimation";
import styles from "./Player.module.scss";

class Player extends Component {
  componentDidMount() {
    if (this.props.dontMove) {
      this.props.dispatch(resetPlayerPosition());
      return;
    }
    window.addEventListener("keydown", this.handleMove);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleMove);
  }

  handleMove = e => {
    if (this.props.dontMove) return;
    switch (e.key) {
      case "ArrowRight":
        return this.props.dispatch(movePlayerThunk("WEST"));
      case "ArrowLeft":
        return this.props.dispatch(movePlayerThunk("EAST"));
      case "ArrowUp":
        return this.props.dispatch(movePlayerThunk("NORTH"));
      case "ArrowDown":
        return this.props.dispatch(movePlayerThunk("SOUTH"));
      default:
    }
  };

  render() {
    const { position, spriteLocation } = this.props;
    return (
      <>
        <StaticAnimation />
        <div
          className={styles.player}
          style={{
            top: `${position[1]}px`,
            left: `${position[0]}px`,
            backgroundPosition: spriteLocation
          }}
          onKeyDown={this.handleMove}
          tabIndex="0"
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  direction: state.player.direction,
  walkIndex: state.player.walkIndex,
  position: state.player.position,
  spriteLocation: state.player.spriteLocation
});

export default connect(mapStateToProps)(Player);
