import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  wasTaskAnsweredAC,
  checkCorrectAnswerAC,
  chooseTaskAC
} from "../../../ac/taskAC";
import { withReduceLives } from "../../../helpers/reduceLivesHoc";
import { Letter } from "./Letter";
import { LifeBar } from "../../LifeBar";
import {
  isAnswerCorrect,
  generateProposedLetters,
  getRandomLetter
} from "../../../helperFunctions";
import { Battle } from "../../Battle";
import * as C from "../../../constants";
import classNames from "classnames";
import styles from "./FindLetter.module.scss";

class FindLetter extends Component {
  state = {
    letterToFind: "",
    proposedLetters: [],
    validation: "",
    selectedValue: "",
    redirectToBattleScreen: false
  };

  cleanQuestion = () => {
    this.setState({
      letterToFind: "",
      proposedLetters: [],
      validation: "",
      selectedValue: ""
    });
  };

  generateNewQuestion = () => {
    const answerLetter = getRandomLetter();
    this.setState({
      letterToFind: answerLetter,
      proposedLetters: generateProposedLetters(answerLetter),
      validation: "",
      selectedValue: ""
    });
  };

  componentDidMount = () => {
    this.generateNewQuestion();
    this.props.chooseTaskAC();
  };

  componentDidUpdate(prevProps) {
    const { monsterLife, playerLife } = prevProps;
    if (monsterLife === 0 || playerLife === 0) {
      this.setState({
        redirectToBattleScreen: true
      });
    }
  }

  setIfAnswerWasCorrect = (correctAnswer, userAnswer) => {
    this.props.checkCorrectAnswerAC(isAnswerCorrect(correctAnswer, userAnswer));
  };

  setUserAnswer = e => {
    this.props.wasTaskAnsweredAC();
    this.setState(
      {
        selectedValue: e.currentTarget.children[0].dataset.letter
      },
      this.showIfAnswerWasCorrect(e)
    );
  };

  showIfAnswerWasCorrect = e => {
    const { letterToFind } = this.state;
    const {
      reduceMonsterLife,
      reducePlayerLife,
      monsterLife,
      playerLife,
      choosedSpell
    } = this.props;
    const selectedValue = e.currentTarget.children[0].dataset.letter;
    if (isAnswerCorrect(letterToFind, selectedValue)) {
      this.setState({
        validation: "correct"
      });
      reduceMonsterLife();
      if (choosedSpell === C.HEALTH) {
        this.props.showStaticAnimation();
      }
      if (monsterLife !== 0 || playerLife !== 0) {
        this.timerHandle = setTimeout(() => {
          this.cleanQuestion();
          this.generateNewQuestion();
          this.timerHandle = 0;
        }, 1500);
      }
    } else {
      this.setState({ validation: "error" });
      if (choosedSpell === C.ARMOR) {
        this.props.showStaticAnimation();
        return;
      }
      reducePlayerLife();
    }
    this.setIfAnswerWasCorrect(letterToFind, selectedValue);
    this.props.wasTaskAnsweredAC();
  };

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const {
      letterToFind,
      proposedLetters,
      validation,
      selectedValue,
      redirectToBattleScreen
    } = this.state;

    if (redirectToBattleScreen) {
      return <Redirect to={`/levelsMap`} />;
    }
    return (
      <>
        <LifeBar />
        <div className={styles.taskScreen}>
          <div className={styles.questionContainer}>
            <h2 className={styles.questionTitle}>Найди букву: </h2>
            <Letter className={styles.questionLetter} letter={letterToFind} />
          </div>
          <div className={styles.answerVariants}>
            {proposedLetters.map(letter => (
              <div
                className={classNames(
                  styles.answerVariantContainer,
                  letter === selectedValue &&
                    ((validation === "correct" && styles.correct) ||
                      (validation === "error" && styles.error))
                )}
                key={letter}
                onClick={this.setUserAnswer}
              >
                <Letter letter={letter} className={styles.answerVariant} />
              </div>
            ))}
          </div>
        </div>
        <Battle />
      </>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered,
  choosedSpell: state.spell.choosedSpell
});

const mapDispatchToProps = dispatch => ({
  chooseTaskAC: () => {
    dispatch(chooseTaskAC());
  },
  wasTaskAnsweredAC: () => {
    dispatch(wasTaskAnsweredAC());
  },
  checkCorrectAnswerAC: boolean => {
    dispatch(checkCorrectAnswerAC(boolean));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReduceLives(FindLetter));
