import React from "react";
import styles from "./Score.module.scss";

function Score() {
  return (
    <div>
      <div className={styles.score}>
        <h2>Score</h2>
        <div className={styles.data}>
          <span>hero1</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}

export { Score };
