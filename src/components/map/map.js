import React from "react";
import { connect } from "react-redux";
import { SPRITE_BACKGROUND_SIZE } from "../../constants";
import "./style.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "wall";
    case 2:
      return "prison";
    case 3:
      return "road-top";
    case 4:
      return "road-bottom";
    case 5:
      return "road-bottom-right";
    case 6:
      return "road-top-left";
    case 7:
      return "road-left";
    case 8:
      return "road-right";
    case 9:
      return "road-right-corner";
    case 10:
      return "road-left-corner";
    case 11:
      return "tree";
    case 12:
      return "woods";
    default:
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        width: SPRITE_BACKGROUND_SIZE,
        height: SPRITE_BACKGROUND_SIZE
      }}
    />
  );
}

function MapRow(props) {
  return (
    <div className="row">
      {props.tiles.map(tile => <MapTile tile={tile} />)}
    </div>
  );
}

function Map(props) {
  return (
    <div className="map">
      {props.tiles.map(row => <MapRow tiles={row} />)}
    </div>
  );
}

const mapStateToProps = state => ({
  tiles: state.map.tiles
});

export default connect(mapStateToProps)(Map);
