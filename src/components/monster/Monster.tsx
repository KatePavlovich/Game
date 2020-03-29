import React, { PureComponent, createRef } from "react";
import * as C from "../../constants";
import { connect } from "react-redux";
import { AppStateType } from "../../reducers";
import { makeMonsterNameThunk, getMonsterPosition } from "../../ac/monsterAC";
import { setMonsterPosition } from "../../helpers/setMonsterPosition";
import styles from "./Monster.module.scss";

type PropsType = {
  map: string;
  makeMonsterName: () => void;
  getMonsterPosition: (position: number[]) => void;
  choosedSpell: string;
  monsterPosition: number[];
  spellPosition: number[];
};

type StateType = {
  spriteLocation: string;
  walkIndex: number;
  position: number[] | undefined;
};

// type mapStateToPropsTypes = {
//   monsterLife: number;
//   choosedSpell: string;
//   monsterPosition: number[];
//   spellPosition: number[];
// };

class Monster extends PureComponent<PropsType, StateType> {
  private monsterRef = createRef<HTMLDivElement>();
  private timerHandler: ReturnType<typeof setInterval> = setInterval(
    () => "",
    150
  );

  state = {
    spriteLocation: C.BASIC_SPRITE_LOCATION,
    walkIndex: C.BASIC_WALKINDEX,
    position: C.BASIC_PLAYER_POSITION
  };

  makeMonsterHurtAnimation = () => {
    const { walkIndex } = this.state;

    if (walkIndex === C.MONSTER_SPRITE_LENGTH) this.stopMonsterAnimation();
    this.setState({
      spriteLocation:
        walkIndex !== C.MONSTER_SPRITE_LENGTH
          ? `-${C.MONSTER_SPRITE_WIDTH * walkIndex}px -${
              C.MONSTER_SPRITE_POSITION_Y
            }px`
          : C.BASIC_SPRITE_LOCATION,
      walkIndex: walkIndex === C.MONSTER_SPRITE_LENGTH ? 0 : walkIndex + 1
    });
  };

  stopMonsterAnimation = () => {
    clearInterval(this.timerHandler);
    this.setState({
      spriteLocation: C.BASIC_SPRITE_LOCATION
    });
  };

  componentDidMount() {
    const { makeMonsterName, getMonsterPosition } = this.props;
    this.setState({ position: setMonsterPosition(this.props.map) });
    let position = [0, 0];
    const node = this.monsterRef.current;
    if (node) {
      const { left, top } = node.getBoundingClientRect();
      position = [Math.round(left), Math.round(top)];
    }
    makeMonsterName();
    getMonsterPosition(position);
  }

  componentDidUpdate(prevProps: PropsType) {
    const { choosedSpell, monsterPosition, spellPosition } = this.props;
    if (
      prevProps.monsterPosition[0] - C.MONSTER_SPRITE_WIDTH / 2 <=
        prevProps.spellPosition[0] &&
      monsterPosition[0] > spellPosition[0] &&
      choosedSpell !== C.HEALTH
    ) {
      this.timerHandler = setInterval(this.makeMonsterHurtAnimation, 150);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerHandler);
  }

  render() {
    const { spriteLocation, position } = this.state;
    return (
      <div
        className={styles.monster}
        style={{
          backgroundPosition: spriteLocation,
          right: `${position[0]}px`,
          top: `${position[1]}px`
        }}
        ref={this.monsterRef}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  monsterLife: state.monster.monsterLife,
  choosedSpell: state.spell.choosedSpell,
  monsterPosition: state.monster.position,
  spellPosition: state.animation.position
});

const mapDispatchToProps = (dispatch: any) => ({
  getMonsterPosition: (position: number[]) =>
    dispatch(getMonsterPosition(position)),
  makeMonsterName: () => dispatch(makeMonsterNameThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Monster);
