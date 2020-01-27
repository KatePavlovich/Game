import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import classNames from "classnames";
import styles from "./TasksScreen.module.scss";

const TasksScreen = ({ wasTaskChoosed }) => {
  return (
    <Modal
      title="Choose spell"
      visible={!wasTaskChoosed}
      closable={false}
      maskClosable={false}
    >
      <Link className={styles.link} to="/simpleMath">
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
