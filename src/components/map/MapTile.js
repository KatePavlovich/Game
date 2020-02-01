import React from "react";
import { getTileSprite } from "../../helpers/getTileSprite";
import { SPRITE_BACKGROUND_SIZE } from "../../constants";
import classNames from "classnames";
import styles from "./Map.module.scss";

const MapTile = ({ tile }) => {
  return (
    <div
      className={classNames(styles.tile, styles[`${getTileSprite(tile)}`])}
      style={{
        width: SPRITE_BACKGROUND_SIZE,
        height: SPRITE_BACKGROUND_SIZE
      }}
    />
  );
};

export { MapTile };
