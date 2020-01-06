import React, { Component } from "react";
import { connect } from "react-redux";
// import { reduceMonsterLife, reducePlayerLife } from "../../../ac";
import { wasTaskAnsweredAC, checkCorrectAnswerAC } from "../../../ac/taskAC";
import {
  getRandomNumberWithoutZero,
  getRandomValueFromArray
} from "../../../helperFunctions";
import { withReduceLives } from "../../../helpers/reduceLivesHoc";
// import axios from "axios";
import { Letter } from "./letter/Letter";
import { LifeBar } from "../../LifeBar/LifeBar";
import { isAnswerCorrect } from "../../../helperFunctions";
import * as C from "../../../constants";
import classNames from "classnames";
import styles from "./findLetter.module.scss";

const alphabet = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я"
];

class FindLetter extends Component {
  state = {
    letterToFind: "",
    proposedLetters: [],
    validation: "",
    selectedValue: ""
  };
  componentDidMount = () => {
    const answerLetter = this.getRandomLetter();
    this.setState(
      { letterToFind: answerLetter },
      this.generateProposedLetters(answerLetter)
    );
    if (this.state.letterToFind) {
      this.setState(this.generateProposedLetters());
    }
    // axios
    //   .get(
    //     `http://api.pobukvam.org/ru/alphabetInfo?alphabet=int-icao&format=json`,
    //     {
    //       headers: {
    //         AccessControlAllowOrigin: "*"
    //       }
    //     }
    //   )
    //   .then(res => {
    //     console.log("results", res);
    //     const persons = res.data;
    //     this.setState({ persons });
    //   });
  };

  shuffle = array => {
    const len = array.length - 1;
    for (let i = len; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  generateProposedLetters = answerLetter => {
    const letters = [];
    while (letters.length < C.PROPOSED_LETTERS_AMOUNT) {
      letters.push(this.getRandomLetter());
    }
    const swappedLetters = this.shuffle([answerLetter, ...letters]);
    this.setState({
      proposedLetters: swappedLetters
    });
  };

  getRandomLetter = () => {
    return alphabet[Math.floor(Math.random() * C.ALPHABET_LENGTH)];
  };

  setIfAnswerWasCorrect = (correctAnswer, userAnswer) => {
    this.props.dispatch(
      checkCorrectAnswerAC(isAnswerCorrect(correctAnswer, userAnswer))
    );
  };

  setUserAnswer = e => {
    console.log({ ...e.currentTarget });
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
    const { reduceMonsterLife, reducePlayerLife } = this.props;
    const selectedValue = e.currentTarget.children[0].dataset.letter;
    if (isAnswerCorrect(letterToFind, selectedValue)) {
      console.log("all right");
      this.setState({
        validation: "correct"
      });
      e.currentTarget.classList.add("correct");
      reduceMonsterLife();
    } else {
      console.log("no no no");
      this.setState({ validation: "error" });
      e.currentTarget.classList.add("error");
      reducePlayerLife();
    }
    this.setIfAnswerWasCorrect(letterToFind, selectedValue);
    this.props.dispatch(wasTaskAnsweredAC());
  };

  render() {
    const { wasTaskAnswered } = this.props;
    const {
      letterToFind,
      proposedLetters,
      validation,
      selectedValue
    } = this.state;
    return (
      <>
        <LifeBar />
        <div className={styles.taskScreen}>
          <div className={styles.questionContainer}>
            <Letter letter={letterToFind} />
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
  wasTaskAnswered: state.tasks.wasTaskAnswered
});

export default connect(mapStateToProps)(withReduceLives(FindLetter));
