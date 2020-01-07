import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { wasTaskAnsweredAC, checkCorrectAnswerAC } from "../../../ac/taskAC";
import { withReduceLives } from "../../../helpers/reduceLivesHoc";
import { Letter } from "./letter/Letter";
import { LifeBar } from "../../LifeBar/LifeBar";
import {
  isAnswerCorrect,
  generateProposedLetters,
  getRandomLetter
} from "../../../helperFunctions";
import classNames from "classnames";
import styles from "./findLetter.module.scss";

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
  };

  setIfAnswerWasCorrect = (correctAnswer, userAnswer) => {
    this.props.dispatch(
      checkCorrectAnswerAC(isAnswerCorrect(correctAnswer, userAnswer))
    );
  };

  setUserAnswer = e => {
    this.props.dispatch(wasTaskAnsweredAC());
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
      playerLife
    } = this.props;
    const selectedValue = e.currentTarget.children[0].dataset.letter;
    if (isAnswerCorrect(letterToFind, selectedValue)) {
      this.setState({
        validation: "correct"
      });
      reduceMonsterLife();
      if (monsterLife !== 0) {
        setTimeout(this.cleanQuestion, 1500);
        setTimeout(this.generateNewQuestion, 1501);
      }
    } else {
      this.setState({ validation: "error" });
      reducePlayerLife();
    }
    if (monsterLife === 0 || playerLife === 0) {
      this.setState({
        redirectToBattleScreen: true
      });
    }
    this.setIfAnswerWasCorrect(letterToFind, selectedValue);
    this.props.dispatch(wasTaskAnsweredAC());
  };

  render() {
    const {
      letterToFind,
      proposedLetters,
      validation,
      selectedValue,
      redirectToBattleScreen
    } = this.state;

    if (redirectToBattleScreen) {
      return <Redirect to={`/battle`} />;
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered,
  monsterLife: state.monster.monsterLife,
  playerLife: state.player.playerLife
});

export default connect(mapStateToProps)(withReduceLives(FindLetter));
