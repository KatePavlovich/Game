import React from "react";
import styles from "./ProgressBar.module.scss";

const Filler = props => {
  return (
    <div className={styles.filler} style={{ width: `${props.percentage}%` }} />
  );
};

export { Filler };
