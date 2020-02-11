import React, { PureComponent } from "react";
import * as C from "../../constants";
import { connect } from "react-redux";
import { makeMonsterNameThunk, getMonsterPosition } from "../../ac/monsterAC";
import { setMonsterPosition } from "../../helpers/setMonsterPosition";
import styles from "./Monster.module.scss";

class Monster extends PureComponent {
  constructor(props) {
    super(props);
    this.monsterRef = React.createRef();
  }

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
    clearInterval(this.timerHandle);
    this.setState({
      spriteLocation: C.BASIC_SPRITE_LOCATION
    });
  };

  componentDidMount() {
    this.setState({ position: setMonsterPosition(this.props.map) });
    const { left, top } = this.monsterRef.current.getBoundingClientRect();
    const position = [Math.round(left), Math.round(top)];

    this.props.dispatch(makeMonsterNameThunk());
    this.props.dispatch(getMonsterPosition(position));
  }

  componentDidUpdate(prevProps) {
    const { choosedSpell, monsterPosition, spellPosition } = this.props;
    if (
      prevProps.monsterPosition[0] - C.MONSTER_SPRITE_WIDTH / 2 <=
        prevProps.spellPosition[0] &&
      monsterPosition[0] > spellPosition[0] &&
      choosedSpell !== C.HEALTH
    ) {
      this.timerHandle = setInterval(this.makeMonsterHurtAnimation, 150);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerHandle);
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

const mapStateToProps = state => ({
  monsterLife: state.monster.monsterLife,
  choosedSpell: state.spell.choosedSpell,
  monsterPosition: state.monster.position,
  spellPosition: state.animation.position
});

export default connect(mapStateToProps)(Monster);
