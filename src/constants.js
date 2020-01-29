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
export const ADD_TILES = "ADD_TILES";
export const CHANGE_TILES = "CHANGE_TILES";
export const TOGGLE_SOUND = "TOGGLE_SOUND";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const LIFE_TO_REDUCE_WITH_SPELL = 20;
export const LIFE_TO_REDUCE_WITHOUT_SPELL = 10;
export const SPRITE_SIZE = 67;
export const FIRE_SPRITE_WIDTH = 128;
export const FIRE_SPRITE_HEIGHT = 126;
export const FIRE = "fire";
export const LEAF = "leaf";
export const HEALTH = "health";

export const FIRE_TOOLTIP = "fire spell";
export const HEALTH_TOOLTIP = "health spell";

export const EAST = "EAST";
export const WEST = "WEST";
export const NORTH = "NORTH";
export const SOUTH = "SOUTH";

export const SPRITE_BACKGROUND_SIZE = 40;
export const MAP_WIDTH = 880;
export const MAP_HEIGHT = 650;
export const MOVE_PLAYER = "MOVE_PLAYER";
export const CHOOSE_TASK = "CHOOSE_TASK";
export const ANSWER_TASK = "ANSWER_TASK";
export const CHECK_CORRECT_ANSWER = "CHECK_CORRECT_ANSWER";
export const RESET_TASK_STATE = "RESET_TASK_STATE";
export const RESET_SPELL = "RESET_SPELL";
export const MOVE_ANIMATION = "MOVE_ANIMATION";
export const RESET_ANIMATION = "RESET_ANIMATION";
export const GET_ANIMATION_INITIAL_POSITION = "GET_ANIMATION_INITIAL_POSITION";

export const BASIC_SPRITE_LOCATION = "0px 0px";
export const BASIC_WALKINDEX = 0;
export const MONSTER_SPRITE_WIDTH = 104;
export const MONSTER_SPRITE_HEIGHT = 130;

export const CHOOSE_SPELL = "CHOOSE_SPELL";
export const SHOW_SPELLMODAL = "SHOW_SPELLMODAL";
export const CLOSE_SPELLMODAL = "CLOSE_SPELLMODAL";

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

export const signs = ["+", "-", "*", "/"];

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
