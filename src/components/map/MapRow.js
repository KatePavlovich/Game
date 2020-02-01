import React from "react";
import { MapTile } from "./MapTile";
import styles from "./Map.module.scss";

const MapRow = ({ tiles }) => {
  return (
    <div className={styles.row}>
      {tiles.map((tile, index) => (
        <MapTile tile={tile} key={`${tile}_${index}`} />
      ))}
    </div>
  );
};

export { MapRow };
