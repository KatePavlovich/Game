import * as C from "../constants";

const getStaticAnimationSprite = spell => {
  if (!spell) return;
  switch (spell) {
    case C.HEALTH:
      return {
        top: `-${C.HEALTH_SPRITE_WIDTH}px`,
        left: 0,
        width: C.HEALTH_SPRITE_WIDTH,
        height: C.HEALTH_SPRITE_HEIGHT,
        background: `url("/tiles/health-sprite.png") no-repeat`,
        backgroundPositionY: 0,
        spriteLength: C.HEALTH_SPRITE_LENGTH
      };
    case C.ARMOR:
      return {
        top: `-${C.ARMOR_SPRITE_TOP_POSITION}px`,
        left: `-${C.ARMOR_SPRITE_TOP_POSITION}px`,
        width: C.ARMOR_SPRITE_WIDTH,
        height: C.ARMOR_SPRITE_HEIGHT,
        background: `url("/tiles/health-sprite.png") no-repeat`,
        backgroundPositionY: C.ARMOR_SPRITE_POSITION_Y,
        spriteLength: C.ARMOR_SPRITE_LENGTH
      };
    default:
  }
};

export { getStaticAnimationSprite };
