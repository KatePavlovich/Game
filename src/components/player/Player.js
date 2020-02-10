import React, { Component } from "react";
import { connect } from "react-redux";
import { movePlayerThunk, resetPlayerPosition } from "../../ac/playerAC";
import { StaticAnimation } from "../StaticAnimation";
import * as C from "../../constants";
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
      case C.ARROW_RIGHT:
        return this.props.dispatch(movePlayerThunk(C.WEST));
      case C.ARROW_LEFT:
        return this.props.dispatch(movePlayerThunk(C.EAST));
      case C.ARROW_UP:
        return this.props.dispatch(movePlayerThunk(C.NORTH));
      case C.ARROW_DOWN:
        return this.props.dispatch(movePlayerThunk(C.SOUTH));
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
