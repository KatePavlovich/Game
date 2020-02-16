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
import { LifeBar } from "../../LifeBar";
import * as C from "../../../constants";
import * as S from "../../../constants/stringValues";
import * as T from "../../../constants/translation";
import styles from "./SimpleMath.module.scss";
import { Battle } from "../../Battle";

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

  setValues = (number1, number2, sign) => {
    // eslint-disable-next-line no-eval
    const answer = parseInt(eval(`${number1}${sign}${number2}`));
    this.setState({
      answer,
      number1,
      number2,
      sign
    });
  };

  setValuesForSimpleLevel = (number1, number2) => {
    if (number1 < number2) {
      [number1, number2] = [number2, number1];
    }
    const sign = getRandomValueFromArray(C.SIMPLE_SIGNS);
    this.setValues(number1, number2, sign);
  };

  setValuesForMiddleLevel = (number1, number2) => {
    const sign = getRandomValueFromArray(C.MIDDLE_SIGNS);
    this.setValues(number1, number2, sign);
  };

  generateNewQuestion = () => {
    let number1 = getRandomNumberWithoutZero(10);
    let number2 = getRandomNumberWithoutZero(10);
    const { level } = this.props;

    if (level === S.SIMPLE) {
      this.setValuesForSimpleLevel(number1, number2);
      return;
    }

    if (level === S.MIDDLE) {
      this.setValuesForSimpleLevel(number1, number2);
      return;
    }

    const sign = getRandomValueFromArray(C.SIGNS);
    this.setValues(number1, number2, sign);
  };

  handleChange = e => {
    this.setState({ userAnswer: e.target.value });
  };

  componentDidUpdate(prevProps) {
    const { monsterLife, playerLife } = prevProps;
    if (monsterLife === 0 || playerLife === 0) {
      this.setState({
        redirectToBattleScreen: true
      });
    }
  }

  compareAnswers = e => {
    e.preventDefault();
    const { answer, userAnswer } = this.state;
    const {
      reduceMonsterLife,
      reducePlayerLife,
      monsterLife,
      playerLife,
      choosedSpell
    } = this.props;
    const isUserAnswerCorrect = isAnswerCorrect(answer, Number(userAnswer));
    if (isUserAnswerCorrect) {
      reduceMonsterLife();
      if (choosedSpell === C.HEALTH) {
        this.props.showStaticAnimation();
      }
      if (monsterLife > 0 || playerLife > 0) {
        this.timerHandle = setTimeout(() => {
          this.generateNewQuestion();
          this.timerHandle = 0;
        }, 1500);
      }
    } else {
      if (choosedSpell === C.ARMOR) {
        this.props.showStaticAnimation();
        this.setState({ userAnswer: "" });
        return;
      }
      reducePlayerLife();
    }
    this.props.checkCorrectAnswerAC(isUserAnswerCorrect);
    this.props.wasTaskAnsweredAC();
    this.setState({ userAnswer: "" });
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
    if (redirectToBattleScreen) {
      return <Redirect to={`/levelsMap`} />;
    }
    return (
      <>
        <LifeBar />
        <div className={styles.content}>
          <div className={styles.question}>
            <span>{number1}</span>
            <span>{sign}</span>
            <span>{number2}</span>
            <span>=?</span>
          </div>
          <form onSubmit={this.compareAnswers}>
            <input
              className={styles.answer}
              type="number"
              placeholder="type answer"
              autoFocus={true}
              value={userAnswer}
              onChange={this.handleChange}
            />
            <input className={styles.button} type="submit" value={T.ANSWER} />
          </form>
        </div>
        <Battle />
      </>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered,
  level: state.tasks.level,
  choosedSpell: state.spell.choosedSpell
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
