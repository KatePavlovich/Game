import React, { Component } from "react";
import { SPRITE_SIZE } from "../../constants";
import { connect } from "react-redux";
import { monsterBodies, monsterHeads, monsterLegs } from "../../constants";
import { makeMonsterNameThunk } from "../../ac";
import { getRandomValueFromArray } from "../../helperFunctions";
import "./index.css";

class Monster extends Component {
  state = {
    head: getRandomValueFromArray(monsterHeads),
    body: getRandomValueFromArray(monsterBodies),
    legs: getRandomValueFromArray(monsterLegs)
  };

  componentDidMount() {
    this.props.dispatch(makeMonsterNameThunk());
  }

  componentDidUpdate() {
    const { monsterLife } = this.props;
    if (monsterLife === 0) {
      this.setState({
        head: getRandomValueFromArray(monsterHeads),
        body: getRandomValueFromArray(monsterBodies),
        legs: getRandomValueFromArray(monsterLegs)
      });
    }
  }

  render() {
    const { head, body, legs } = this.state;
    return (
      <div
        className="monster__container"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "0px",
          width: `${SPRITE_SIZE}px`,
          height: `${SPRITE_SIZE * 3}px`
        }}
      >
        <div
          style={{
            backgroundImage: `url(${head})`,
            width: `${SPRITE_SIZE}px`,
            height: `${SPRITE_SIZE}px`
          }}
        />
        <div
          style={{
            backgroundImage: `url(${body})`,
            width: `${SPRITE_SIZE}px`,
            height: `${SPRITE_SIZE}px`
          }}
        />
        <div
          style={{
            backgroundImage: `url(${legs})`,
            width: `${SPRITE_SIZE}px`,
            height: `${SPRITE_SIZE}px`
          }}
        />
      </div>
    );
  }
}

export default connect()(Monster);
