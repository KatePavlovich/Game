import React from "react";
import { Filler } from "./Filler";
import styles from "./ProgressBar.module.scss";

const ProgressBar = props => {
  return (
    <div className={styles.progressBar} title={props.percentage}>
      <Filler percentage={props.percentage} />
    </div>
  );
};

export { ProgressBar };
