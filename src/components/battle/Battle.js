import React from "react";
import styles from "./Battle.module.scss";
import { Monster } from "../Monster";
import { Player } from "../Player";
import { Animation } from "../Animation";
import * as C from "../../constants";

const Battle = () => {
  return (
    <div className={styles.container}>
      <Player dontMove />
      <Animation />
      <Monster map={C.TASK_MAP} />
    </div>
  );
};

export { Battle };
