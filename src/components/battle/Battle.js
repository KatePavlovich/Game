import React from "react";
import styles from "./Battle.module.scss";
import { Monster } from "../Monster";
import { Player } from "../Player";
import { Animation } from "../Animation";

const Battle = () => {
  return (
    <div className={styles.container}>
      <Player dontMove={true} />
      <Animation />
      <Monster />
    </div>
  );
};

export { Battle };
