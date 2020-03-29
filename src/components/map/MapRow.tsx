import React from "react";
import { MapTile } from "./MapTile";
import styles from "./Map.module.scss";

type MapRowProps = {
  tiles: number[];
};

const MapRow = ({ tiles }: MapRowProps) => {
  return (
    <div className={styles.row}>
      {tiles.map((tile: number, index: number) => (
        <MapTile tile={tile} key={`${tile}_${index}`} />
      ))}
    </div>
  );
};

export { MapRow };
