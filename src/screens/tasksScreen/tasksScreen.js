import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTaskLevelAC } from "../../ac/taskAC";
import * as S from "../../constants/stringValues";
import { Modal } from "antd";
import classNames from "classnames";
import styles from "./TasksScreen.module.scss";

const TasksScreen = ({ wasTaskChoosed }) => {
  const dispatch = useDispatch();

  const handleClick = level => {
    dispatch(setTaskLevelAC(level));
  };
  return (
    <Modal
      title="Choose spell"
      visible={!wasTaskChoosed}
      closable={false}
      maskClosable={false}
    >
      <Link
        className={styles.link}
        onClick={() => handleClick(S.SIMPLE)}
        to="/simpleMath"
      >
        <div className={styles.simple}></div>
        <div
          className={classNames(styles.imgContainer, styles.math, styles.level)}
        ></div>
        <span className={styles.title}>Math</span>
      </Link>
      <Link
        className={styles.link}
        onClick={() => handleClick(S.MIDDLE)}
        to="/simpleMath"
      >
        <div className={styles.middle}></div>
        <div className={classNames(styles.imgContainer, styles.math)}></div>
        <span className={styles.title}>Math</span>
      </Link>
      <Link
        className={styles.link}
        onClick={() => handleClick(S.HARD)}
        to="/simpleMath"
      >
        <div className={styles.hard}></div>
        <div className={classNames(styles.imgContainer, styles.math)}></div>
        <span className={styles.title}>Math</span>
      </Link>
      <Link className={styles.link} to="/findLetter">
        <div className={classNames(styles.imgContainer, styles.alphabet)}></div>
        <span className={styles.title}>Find letter</span>
      </Link>
    </Modal>
  );
};

export { TasksScreen };
