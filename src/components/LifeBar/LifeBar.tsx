import React from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "../ProgressBar";
import styles from "./LifeBar.module.scss";
import { AppStateType } from "../../reducers";

const LifeBar = () => {
  const playerLife = useSelector<AppStateType, number>(
    state => state.player.playerLife
  );
  const monsterLife = useSelector<AppStateType, number>(
    state => state.monster.monsterLife
  );
  const monsterName = useSelector<AppStateType, string>(
    state => state.monster.monsterName
  );
  const playerName = useSelector<AppStateType, string>(
    state => state.player.playerName
  );

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
