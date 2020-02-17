const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "wall";
    case 2:
      return "prison";
    case 3:
      return "road-top";
    case 13:
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
};

export { getTileSprite };
