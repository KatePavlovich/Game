import React from "react";
import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className={styles.progressBar} title={`${percentage}`}>
      <div className={styles.filler} style={{ width: `${percentage}%` }} />
    </div>
  );
};

export { ProgressBar };
