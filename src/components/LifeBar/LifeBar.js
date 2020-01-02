import React from "react";
import ProgressBar from "../../components/progressBar/progressBar";
import styles from "./lifeBar.module.scss";

const LifeBar = ({ playerLife, monsterLife, monsterName, playerName }) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>{playerName}</h3>
        <span>player life: {playerLife} hp</span>
        <ProgressBar percentage={playerLife} />
      </div>
      <div className={styles.monsterLife}>
        <h3 className={styles.title}>{monsterName}</h3>
        <span>monster life: {monsterLife} hp</span>
        <ProgressBar percentage={monsterLife} />
      </div>
    </div>
  </header>
);

export { LifeBar };
