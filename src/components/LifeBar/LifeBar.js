import React from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "../ProgressBar";
import styles from "./LifeBar.module.scss";

const LifeBar = () => {
  const playerLife = useSelector(state => state.player.playerLife);
  const monsterLife = useSelector(state => state.monster.monsterLife);
  const monsterName = useSelector(state => state.monster.monsterName);
  const playerName = useSelector(state => state.player.playerName);

  return (
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
};

export { LifeBar };
