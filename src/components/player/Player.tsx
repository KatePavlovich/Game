import React, { Component } from "react";
import { connect } from "react-redux";
import { movePlayerThunk, resetPlayerPosition } from "../../ac/playerAC";
import { StaticAnimation } from "../StaticAnimation";
import * as C from "../../constants";
import styles from "./Player.module.scss";
import { AppStateType } from "../../reducers";

type PropsTypes = {
  dontMove: boolean;
  position: number[];
  spriteLocation: string;
  resetPlayerPosition: () => void;
  movePlayer: (direction: string) => void;
};

type mapStateToPropsType = {
  direction: string;
  walkIndex: number;
  position: number[];
  spriteLocation: string;
};

type mapDispatchPropsType = {
  movePlayer: (direction: string) => void;
  resetPlayerPosition: () => void;
};

class Player extends Component<PropsTypes> {
  componentDidMount() {
    const { dontMove, resetPlayerPosition } = this.props;
    if (dontMove) {
      resetPlayerPosition();
      return;
    }
    window.addEventListener("keydown", this.handleMove);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleMove);
  }

  handleMove = () => (event: KeyboardEvent) => {
    const { movePlayer } = this.props;
    if (this.props.dontMove) return;
    switch (event.key) {
      case C.ARROW_RIGHT:
        return movePlayer(C.WEST);
      case C.ARROW_LEFT:
        return movePlayer(C.EAST);
      case C.ARROW_UP:
        return movePlayer(C.NORTH);
      case C.ARROW_DOWN:
        return movePlayer(C.SOUTH);
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
          tabIndex={0}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  direction: state.player.direction,
  walkIndex: state.player.walkIndex,
  position: state.player.position,
  spriteLocation: state.player.spriteLocation
});

const mapDispatchToProps = (dispatch: any) => ({
  movePlayer: (direction: string) => dispatch(movePlayerThunk(direction)),
  resetPlayerPosition: () => dispatch(resetPlayerPosition())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
