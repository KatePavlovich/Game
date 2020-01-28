import React, { Component } from "react";
import { connect } from "react-redux";
import { movePlayerThunk } from "../../ac";
import * as C from "../../constants";
import styles from "./Player.module.scss";

class Player extends Component {
  componentDidMount() {
    if (this.props.dontMove) return;
    window.addEventListener("keydown", this.handleMove);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.handleMove);
  }
  handleMove = e => {
    // e.preventDefault();
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
    const { position, spriteLocation, dontMove } = this.props;
    return (
      <div className={styles.playerContainer}>
        <div
          className={styles.player}
          style={{
            top: `${position[1]}px`,
            left: `${position[0]}px`,
            backgroundPosition: spriteLocation
          }}
          onKeyDown={!dontMove ? this.handleMove : undefined}
          tabIndex="0"
        />
        {/* <div
          className={styles.health}
          style={{
            backgroundPosition: AnimationSpriteLocation
          }}
        /> */}
      </div>
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
