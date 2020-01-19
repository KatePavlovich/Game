import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { wasTaskAnsweredAC, checkCorrectAnswerAC } from "../../../ac/taskAC";
import { withReduceLives } from "../../../helpers/reduceLivesHoc";
import {
  getRandomNumberWithoutZero,
  getRandomValueFromArray,
  isAnswerCorrect
} from "../../../helperFunctions";
import { chooseTaskAC } from "../../../ac/taskAC";
import { LifeBar } from "../../LifeBar/LifeBar";
import { signs } from "../../../constants";
import "./index.css";

class SimpleMath extends Component {
  state = {
    number1: "",
    number2: "",
    sign: "",
    answer: "",
    userAnswer: "",
    redirectToBattleScreen: false
  };

  componentDidMount = () => {
    this.props.chooseTaskAC();
    this.generateNewQuestion();
  };

  generateNewQuestion = () => {
    const number1 = getRandomNumberWithoutZero(10);
    const number2 = getRandomNumberWithoutZero(10);
    const sign = getRandomValueFromArray(signs);
    // eslint-disable-next-line no-eval
    const answer = parseInt(eval(`${number1}${sign}${number2}`));
    this.setState({
      answer,
      number1,
      number2,
      sign
    });
  };

  handleChange = e => {
    this.setState({ userAnswer: e.target.value });
  };

  compareAnswers = e => {
    const { answer, userAnswer } = this.state;
    const {
      reduceMonsterLife,
      reducePlayerLife,
      monsterLife,
      playerLife
    } = this.props;
    if (e.key === "Enter") {
      const isUserAnswerCorrect = isAnswerCorrect(answer, Number(userAnswer));
      if (isUserAnswerCorrect) {
        reduceMonsterLife();
        if (monsterLife !== 0 || playerLife !== 0) {
          this.timerHandle = setTimeout(() => {
            this.generateNewQuestion();
            this.timerHandle = 0;
          }, 1500);
        }
      } else {
        reducePlayerLife();
      }
      if (monsterLife === 0 || playerLife === 0) {
        this.setState({
          redirectToBattleScreen: true
        });
      }
      this.props.checkCorrectAnswerAC(isUserAnswerCorrect);
      this.props.wasTaskAnsweredAC();
      this.setState({ userAnswer: "" });
    }
  };

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const {
      sign,
      number1,
      number2,
      userAnswer,
      redirectToBattleScreen
    } = this.state;
    console.log("redirectToBattleScreen", redirectToBattleScreen);
    if (redirectToBattleScreen) {
      return <Redirect to={`/battle`} />;
    }
    return (
      <>
        <LifeBar />
        <div>
          <div>
            <span>{number1}</span>
            <span>{sign}</span>
            <span>{number2}</span>
            <span>=?</span>
          </div>
          <input
            type="text"
            placeholder="type answer"
            onKeyPress={this.compareAnswers}
            autoFocus={true}
            value={userAnswer}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered
});

const mapDispatchToProps = dispatch => ({
  chooseTaskAC: () => {
    dispatch(chooseTaskAC());
  },
  checkCorrectAnswerAC: boolean => {
    dispatch(checkCorrectAnswerAC(boolean));
  },
  wasTaskAnsweredAC: () => {
    dispatch(wasTaskAnsweredAC());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReduceLives(SimpleMath));
