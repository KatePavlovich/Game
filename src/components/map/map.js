import React from "react";
import { useSelector } from "react-redux";
import { MapRow } from "./MapRow";
import styles from "./Map.module.scss";

const Map = () => {
  const tiles = useSelector(state => state.map.tiles);
  return (
    <div className={styles.map}>
      {tiles.map(row => (
        <MapRow tiles={row} key={row} />
      ))}
    </div>
  );
};

export { Map };
