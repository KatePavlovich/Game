export const GET_PLAYER_NAME = "GET_PLAYER_NAME";
export const GET_MONSTER_NAME = "GET_MONSTER_NAME";
export const REDUCE_MONSTER_LIFE = "REDUCE_MONSTER_LIFE";
export const MAKE_NEW_MONSTER = "MAKE_NEW_MONSTER";
export const GET_MONSTER_POSITION = "GET_MONSTER_POSITION";
export const REDUCE_PLAYER_LIFE = "REDUCE_PLAYER_LIFE";
export const RESTORE_PLAYER_LIFE = "RESTORE_PLAYER_LIFE";
export const SHOULD_PLAY_HEALTH_ANIMATION = "SHOULD_PLAY_HEALTH_ANIMATION";
export const SET_PLAYER_ON_LEVEL_EXIT = "SET_PLAYER_ON_LEVEL_EXIT";
export const SET_PLAYER_ON_LEVEL_START = "SET_PLAYER_ON_LEVEL_START";
export const RESET_PLAYER_POSITION = "RESET_PLAYER_POSITION";
export const ADD_TILES = "ADD_TILES";
export const CHANGE_TILES = "CHANGE_TILES";
export const SET_MONSTER_POSITION_IN_PX = "SET_MONSTER_POSITION_IN_PX";
export const TOGGLE_SOUND = "TOGGLE_SOUND";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const ENEMY_ON_MAP = 13;
export const MAX_PLAYER_LIFE = 100;
export const BASIC_PLAYER_POSITION = [0, 0];

export const SPELL_SPRITE_WIDTH = 64;
export const SPELL_SPRITE_LENGTH = 8;

export const LIFE_TO_REDUCE_WITH_SPELL = 20;
export const LIFE_TO_REDUCE_WITHOUT_SPELL = 10;
export const SPRITE_SIZE = 67;
export const FIRE_SPRITE_WIDTH = 128;
export const FIRE_SPRITE_HEIGHT = 126;
export const FIRE = "fire";
export const LEAF = "leaf";
export const HEALTH = "health";
export const ARMOR = "armor";

export const EAST = "EAST";
export const WEST = "WEST";
export const NORTH = "NORTH";
export const SOUTH = "SOUTH";

export const ARROW_RIGHT = "ArrowRight";
export const ARROW_LEFT = "ArrowLeft";
export const ARROW_UP = "ArrowUp";
export const ARROW_DOWN = "ArrowDown";

export const SPRITE_BACKGROUND_SIZE = 40;
export const MAP_WIDTH = 880;
export const MAP_HEIGHT = 650;
export const MOVE_PLAYER = "MOVE_PLAYER";

export const CHOOSE_TASK = "CHOOSE_TASK";
export const ANSWER_TASK = "ANSWER_TASK";
export const CHECK_CORRECT_ANSWER = "CHECK_CORRECT_ANSWER";
export const RESET_TASK_STATE = "RESET_TASK_STATE";
export const SET_TASK_LEVEL = "SET_TASK_LEVEL";
export const SHOW_TASKS_MODAL = "SHOW_TASKS_MODAL";
export const CLOSE_TASKS_MODAL = "CLOSE_TASKS_MODAL";

export const RESET_SPELL = "RESET_SPELL";
export const MOVE_ANIMATION = "MOVE_ANIMATION";
export const RESET_ANIMATION = "RESET_ANIMATION";
export const GET_ANIMATION_INITIAL_POSITION = "GET_ANIMATION_INITIAL_POSITION";
export const SHOW_STATIC_ANIMATION = "SHOW_STATIC_ANIMATION";

export const BASIC_SPRITE_LOCATION = "0px 0px";
export const BASIC_WALKINDEX = 0;
export const MONSTER_SPRITE_WIDTH = 116;
export const MONSTER_SPRITE_HEIGHT = 134;
export const MONSTER_SPRITE_LENGTH = 4;
export const MONSTER_SPRITE_POSITION_Y = 0;

export const HEALTH_SPRITE_WIDTH = 60;
export const HEALTH_SPRITE_HEIGHT = 60;
export const HEALTH_SPRITE_POSITION_Y = 0;
export const HEALTH_SPRITE_LENGTH = 16;

export const ARMOR_SPRITE_WIDTH = 130;
export const ARMOR_SPRITE_HEIGHT = 134;
export const ARMOR_SPRITE_POSITION_Y = 1000;
export const ARMOR_SPRITE_LENGTH = 7;
export const ARMOR_SPRITE_TOP_POSITION = 30;

export const CHOOSE_SPELL = "CHOOSE_SPELL";
export const SHOW_SPELLMODAL = "SHOW_SPELLMODAL";
export const CLOSE_SPELLMODAL = "CLOSE_SPELLMODAL";

export const LEVELS_MAP = "/levelsMap";
export const TASKS_PATH = "/tasks";

export const GRASS_MAP = "GRASS_MAP";
export const TASK_MAP = "TASK_MAP";

export const adjective = ["ужасный", "злобный", "сопливый"];
export const creature = ["Огр", "Гном", "Гоблин"];
export const monsterName = ["Том", "Макс", "Дима"];

export const monsterBodies = [
  "https://banner2.kisspng.com/20180418/xlw/kisspng-dress-cartoon-clip-art-bodies-5ad7c3ae8b1849.0189824015240897745697.jpg",
  "https://png.pngtree.com/png_detail/18/09/10/pngtree-the-standing-cartoon-body-png-clipart_3521056.jpg",
  "https://vignette.wikia.nocookie.net/battlefordreamisland/images/9/9c/Shadow_Bomby_body.png/revision/latest?cb=20171205063143"
];

export const failureAudio = new Audio(
  "https://freesound.org/data/previews/131/131891_2398403-lq.mp3"
);
export const winAudio = new Audio(
  "https://freesound.org/data/previews/181/181425_1823830-lq.mp3"
);
export const bangSound = new Audio(
  "https://freesound.org/data/previews/33/33245_65091-lq.mp3"
);

export const hitMonstrSound = new Audio(
  "https://freesound.org/data/previews/409/409346_7662331-lq.mp3"
);

export const SIMPLE_SIGNS = ["+", "-"];
export const MIDDLE_SIGNS = ["+", "-", "*"];
export const SIGNS = ["+", "-", "*", "/"];

export const ALPHABET_LENGTH = 32;
export const PROPOSED_LETTERS_AMOUNT = 4;
export const ALPHABET = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я"
];
