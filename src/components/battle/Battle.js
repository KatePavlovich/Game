import React from "react";
import styles from "./Battle.module.scss";
import { Monster } from "../monster";
import { Player } from "../player";
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
