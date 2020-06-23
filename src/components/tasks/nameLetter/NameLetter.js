import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  wasTaskAnsweredAC,
  checkCorrectAnswerAC,
  chooseTaskAC,
} from "../../../ac/taskAC";
import { withReduceLives } from "../../../helpers/reduceLivesHoc";
import { Letter } from "../findLetter/Letter";
import { LifeBar } from "../../LifeBar";
import { isAnswerCorrect, getRandomLetter } from "../../../helperFunctions";
import { Battle } from "../../Battle";
import * as C from "../../../constants";
import { ReactComponent as StartSpeech } from "../../../icons/play-button.svg";
import { ReactComponent as Microphone } from "../../../icons/microphone.svg";
import classNames from "classnames";
import styles from "./NameLetter.module.scss";

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";
const grammar =
  "#JSGF V1.0; grammar letters; public <letter> = а | б | в | г | д | е | ё | ж | з | и | й | к | л | м | н | о | п | р | с | т | у | ф | х | ц | ч | ш | щ | ъ | ы | ь | э | ю | я";
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;

const NameLetter = ({
  chooseTaskAC,
  wasTaskAnsweredAC,
  reduceMonsterLife,
  reducePlayerLife,
  monsterLife,
  playerLife,
  choosedSpell,
  showStaticAnimation,
  checkCorrectAnswerAC,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [letterToName, setLetterToName] = useState(getRandomLetter());
  const [namedValue, setNamedValue] = useState("");
  const [redirectToBattleScreen, setRedirectToBattleScreen] = useState(false);
  let timerHandle = null;

  const cleanQuestion = () => {
    setLetterToName("");
    setNamedValue("");
  };

  const generateNewQuestion = () => {
    setLetterToName(getRandomLetter());
    setNamedValue("");
  };

  useEffect(() => {
    if (monsterLife === 0 || playerLife === 0) {
      setRedirectToBattleScreen(true);
    }
  }, [monsterLife, playerLife]);

  const setIfAnswerWasCorrect = (correctAnswer, userAnswer) => {
    checkCorrectAnswerAC(isAnswerCorrect(correctAnswer, userAnswer));
  };

  const setUserAnswer = (letter) => {
    wasTaskAnsweredAC();
    showIfAnswerWasCorrect(letter);
  };

  const showIfAnswerWasCorrect = (letter) => {
    console.log("Correct", letterToName.toLowerCase(), letter);
    handleStopListen();

    if (isAnswerCorrect(letterToName.toLowerCase(), letter)) {
      // this.setState({
      //   validation: "correct",
      // });
      reduceMonsterLife();
      if (choosedSpell === C.HEALTH) {
        showStaticAnimation();
      }
      if (monsterLife !== 0 || playerLife !== 0) {
        timerHandle = setTimeout(() => {
          cleanQuestion();
          generateNewQuestion();
          timerHandle = 0;
        }, 1500);
      }
    } else {
      // this.setState({ validation: "error" });
      if (choosedSpell === C.ARMOR) {
        showStaticAnimation();
        return;
      }
      reducePlayerLife();
    }
    setIfAnswerWasCorrect(letterToName.toLowerCase(), letter);
    wasTaskAnsweredAC();
  };

  // componentWillUnmount() {
  //   if (this.timerHandle) {
  //     clearTimeout(this.timerHandle);
  //     this.timerHandle = 0;
  //   }
  // }

  const handleListen = () => {
    setIsSpeaking(true);
  };

  const handleStopListen = () => {
    setIsSpeaking(false);
    recognition.stop();
  };

  const findLetterInAnswer = (str) => {
    const arrayFromString = str.toLowerCase().split(" ");
    const indexOfLetterWord = arrayFromString.indexOf("буква");
    return arrayFromString[indexOfLetterWord + 1];
  };

  if (isSpeaking) {
    recognition.start();
  }

  recognition.onresult = (event) => {
    let finalTranscript = "";

    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
        let letter = finalTranscript;
        if (finalTranscript.length > 1) {
          letter = findLetterInAnswer(finalTranscript);
        }
        setIsSpeaking(false);
        setNamedValue(letter);
        setUserAnswer(letter);
      }
    }
  };

  if (redirectToBattleScreen) {
    return <Redirect to={`/levelsMap`} />;
  }

  return (
    <>
      <LifeBar />
      <div className={styles.taskScreen}>
        <div className={styles.questionContainer}>
          <h2 className={styles.questionTitle}>Назови букву: </h2>
          <div className={styles.question}>
            {isSpeaking ? (
              <Microphone
                className={styles.speechButton}
                onClick={handleStopListen}
              />
            ) : (
              <StartSpeech
                className={styles.speechButton}
                onClick={handleListen}
              />
            )}
            <Letter className={styles.questionLetter} letter={letterToName} />
          </div>
        </div>
      </div>
      <Battle />
    </>
  );
};

const mapStateToProps = (state) => ({
  wasTaskAnswered: state.tasks.wasTaskAnswered,
  choosedSpell: state.spell.choosedSpell,
});

const mapDispatchToProps = (dispatch) => ({
  chooseTaskAC: () => {
    dispatch(chooseTaskAC());
  },
  wasTaskAnsweredAC: () => {
    dispatch(wasTaskAnsweredAC());
  },
  checkCorrectAnswerAC: (boolean) => {
    dispatch(checkCorrectAnswerAC(boolean));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withReduceLives(NameLetter));
