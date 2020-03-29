import React from "react";
import classNames from "classnames";
import styles from "./Letter.module.scss";

type LetterProps = {
  letter: string;
  className: string;
};

const Letter = ({ letter, className }: LetterProps) => {
  return (
    <span className={classNames(styles.letter, className)} data-letter={letter}>
      {letter}
    </span>
  );
};

export { Letter };
