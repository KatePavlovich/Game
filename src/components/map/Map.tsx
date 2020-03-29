import React from "react";
import { useSelector } from "react-redux";
import { MapRow } from "./MapRow";
import styles from "./Map.module.scss";
import { AppStateType } from "../../reducers";

const Map = () => {
  const tiles = useSelector<AppStateType, number[][]>(state => state.map.tiles);
  return (
    <div className={styles.map}>
      {tiles.map(row => (
        <MapRow tiles={row} key={row.join()} />
      ))}
    </div>
  );
};

export { Map };
