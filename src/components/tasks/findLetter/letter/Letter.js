import React from "react";
import classNames from "classnames";
import styles from "./Letter.module.scss";

const Letter = ({ letter, onClick, className }) => {
  return (
    <span
      className={classNames(styles.letter, className)}
      onClick={onClick}
      data-letter={letter}
    >
      {letter}
    </span>
  );
};

export { Letter };
