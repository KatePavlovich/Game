import React, { Component } from "react";
import { connect } from "react-redux";
import { wasTaskAnsweredAC, checkCorrectAnswerAC } from "../../../ac/taskAC";
import { Modal } from "antd";
import {
  getRandomNumberWithoutZero,
  getRandomValueFromArray
} from "../../../helperFunctions";
import "./index.css";

const signs = ["+", "-", "*", "/"];

class SimpleMath extends Component {
  state = {
    number1: getRandomNumberWithoutZero(10),
    number2: getRandomNumberWithoutZero(10),
    sign: getRandomValueFromArray(signs)
  };

  compareAnswers = e => {
    let playerAnswer = e.currentTarget.value;
    const { sign, number1, number2 } = this.state;
    if (e.key === "Enter") {
      let correctAnswer = parseInt(eval(`${number1}${sign}${number2}`));
      let transformedPlayerAnswer = parseInt(playerAnswer, 10);
      if (transformedPlayerAnswer === correctAnswer) {
        this.props.dispatch(checkCorrectAnswerAC(true));
      } else {
        this.props.dispatch(checkCorrectAnswerAC(false));
      }
      this.props.dispatch(wasTaskAnsweredAC());
      playerAnswer = "";
    }
  };

  render() {
    const { sign, number1, number2 } = this.state;
    const { wasTaskAnswered } = this.props;
    return (
      <Modal
        title="Choose spell"
        visible={!wasTaskAnswered}
        closable={false}
        maskClosable={false}
      >
        <div>
          <div>
            <span>
              {number1}
            </span>
            <span>
              {sign}
            </span>
            <span>
              {number2}
            </span>
            <span>=?</span>
          </div>
          <input
            type="text"
            placeholder="type answer"
            onKeyPress={this.compareAnswers}
            autoFocus={true}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered
});

export default connect(mapStateToProps)(SimpleMath);
