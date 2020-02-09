import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTaskLevelAC } from "../../ac/taskAC";
import { closeTasksModalAC } from "../../ac/tasksModalAC";
import * as S from "../../constants/stringValues";
import { Modal } from "antd";
import classNames from "classnames";
import styles from "./TasksScreen.module.scss";

const TasksScreen = () => {
  const showModal = useSelector(state => state.tasks.showTasksModal);
  const dispatch = useDispatch();

  const handleClick = level => {
    dispatch(closeTasksModalAC());
    dispatch(setTaskLevelAC(level));
  };
  return (
    <Modal
      title="Choose spell"
      visible={showModal}
      closable={false}
      maskClosable={false}
    >
      <Link
        className={styles.link}
        onClick={() => handleClick(S.SIMPLE)}
        to="/tasks/simpleMath"
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
        to="/tasks/simpleMath"
      >
        <div className={styles.middle}></div>
        <div className={classNames(styles.imgContainer, styles.math)}></div>
        <span className={styles.title}>Math</span>
      </Link>
      <Link
        className={styles.link}
        onClick={() => handleClick(S.HARD)}
        to="/tasks/simpleMath"
      >
        <div className={styles.hard}></div>
        <div className={classNames(styles.imgContainer, styles.math)}></div>
        <span className={styles.title}>Math</span>
      </Link>
      <Link
        className={styles.link}
        onClick={() => dispatch(closeTasksModalAC())}
        to="/tasks/findLetter"
      >
        <div className={classNames(styles.imgContainer, styles.alphabet)}></div>
        <span className={styles.title}>Find letter</span>
      </Link>
    </Modal>
  );
};

export { TasksScreen };
