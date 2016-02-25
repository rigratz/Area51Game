//world.js
function World(name, gameEngine) {
  this.game = gameEngine;
  this.name = name;
  this.rooms = [];
  for (var i = 0; i < 10; i++) {
    this.rooms[i] = [];
    for (var j = 0; j < 10; j++) {
      this.rooms[i][j] = j;
    }
  }
  this.currentRoom = null;
  this.makeRoomPlans(name);
};

World.prototype.makeRoomPlans = function (name) {
  var builder = [];
  for (var i = 0; i < 10; i++) {
    builder[i] = [];
    for (var j = 0; j < 10; j++) {
      builder[i][j] = null;
    }
  }

  if (name === "Area 51") {
    builder = [

// <<<<<<< HEAD
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                              O",
      "X                                              O",
      "X                                              O",
      "XW                    s                    E   O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      // "XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "O             B    X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "O  @               X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X B                XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X     B            XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                                         XX",
      // "XXXXXXXXXXXXXX     X                                         XX",
      // "XXXXXXXXXXXXXX     X                                         XX",
      // "XXXXXXXXXXXXXX     X                                         XX",
      // "XXXXXXXXXXXXXX     X       X     XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X B           B            X     XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X  S             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XX                                                           XX",
      // "XX              B            B                   B           XX",
      // "O                                                            XX",
      // "O            XX           XX            XX                   XX",
      // "O            XX           XX            XX                    O",
      // "O            XX           XX            XX                    O",
      // "O            XX           XX            XX                    O",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// =======
//       "XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O             B    X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O  @               X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X B                XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X     B            XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X       X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X  S             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XX                                                           XX",
//       "XX              B            B                   B           XX",
//       "O                                                            XX",
//       "O            XX           XX            XX                   XX",
//       "O            XX           XX            XX                    O",
//       "O            XX           XX            XX                    O",
//       "O            XX           XX            XX                    O",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// >>>>>>> e51f659301a05e5f357669d66a0a49476eb160dd
// =======
//       "XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O              B   X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "O  @               X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X B                XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X     B            XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X                                         XX",
//       "XXXXXXXXXXXXXX     X       X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "X  S             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
//       "XX                                                           XX",
//       "XX              B            B                   B           XX",
//       "O                                                            XX",
//       "O            XX           XX            XX                   XX",
//       "O            XX           XX            XX                    O",
//       "O            XX           XX            XX                    O",
//       "O            XX           XX            XX                    O",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//       "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// >>>>>>> aa0bc3c70da0158fe609af8a946b070680e343f2
//>>>>>>> e1f53d22d4d976623ceedddbdd9a6ccf5d7acf40
    ];
    this.rooms[0][6] = new Level(builder, 0, 6, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O W       S       XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXOOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "X                  X                                          O",
      // "X                  X        B                                 O",
      // "X                  X                                          O",
      // "XXXXXXXXXXXXXX     X                                          O",
      // "XXXXXXXXXXXXXX     X                                      @   O",
      // "XXXXXXXXXXXXXX     X             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X  S               XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     XXXXXXXX           XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                XXXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      // "XXXXXXXXXXXXXX     X             XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                                XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X B                              XXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX"

    ];
    this.rooms[0][7] = new Level(builder, 0, 7, this.game);
    builder = [
      "XXXXXOOOOOOXXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX  N   XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXX  S   XXXXX",
      "XXXXX      XXXXX",
      "XXXXX      XXXXX",
      "XXXXXOOOOOOXXXXX",

      // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "X                                              X",
      // "X                                              X",
      // "X                                              X",
      // "X                                              X",
      // "X                                              X",
      // "X                                              X",
      // "X                                              X",
      // "X                 X      X                     X",
      // "O                 X      X                     X",
      // "O                 X      X                     X",
      // "O  @              X      X                     X",
      // "XXXXXXXXXXXXXXXXXXX111111XXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[1][7] = new Level(builder, 1, 7, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXOOOOOOXXXXXXXXXXXXXXXXXXXXXXX",
      "O            XXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "O            XXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "O W          XXXXXX   N  XXXXXXXXXXXXXXXXXXXXXXX",
      "XXXX         XXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "X            XXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "X            XXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "X       XXXXXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXX",
      "X                                              X",
      "X                                              X",
      "XXXXXX                                         X",
      "X                                              O",
      "X                                              O",
      "X                                          E   O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[2][7] = new Level(builder, 2, 7, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                              X",
      "XXXXXXXXXX                                     X",
      "X  B     X                                     X",
      "X        X                                     O",
      "X        X                                     O",
      "X        X        XXXXXXXX                 E   O",
      "X        X        X      X        XXXXXXXXXXXXXX",
      "XXXXXXXXXX        X D    X        X            X",
      "O              XXXX      XXXX     X            X",
      "O              XXXX      XXXX     X            X",
      "O W            XXXX      XXXX     X            X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[2][8] = new Level(builder, 2, 8, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXOOOOOX",
      "O                      X",
      "O                      X",
      "O W                N   X",
      "XXXXXXX        XXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "X         XXXXXXXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "XXXXXXX        XXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "X         XXXXXXXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "X    XXXXXX    XXXXXXXXX",
      "X              XXXXXXXXX",
      "X              XXXXXXXXX",
      "X S            XXXXXXXXX",
      "XXXXX      XXXXXXXXXXXXX",
      "XXXXX      XXXXXXXXXXXXX",
      "XXXXXOOOOOOXXXXXXXXXXXXX"
    ]
    this.rooms[2][9] = new Level(builder, 2, 9, this.game);
    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "O              X",
      "O              X",
      "O W     S      X",
      "XXXXXXXXXXOOOOOX"
    ];
    this.rooms[1][9] = new Level(builder, 1, 9, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X      XX      X",
      "X      XX      O",
      "X    XXXXXX    O",
      "X    XXXXXX E  O",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[1][8] = new Level(builder, 1, 8, this.game);

    builder = [
      "XXXXXXXXXOOOOOOXXXXXXXXX",
      "X B     X              X",
      "X       X              X",
      "X       X N            X",
      "X       XXXXXXX        X",
      "X       X              X",
      "XXXXXXXXX              X",
      "XXXXXXXXX              X",
      "X B     X              X",
      "X       X       XXXXXXXX",
      "X       X              X",
      "X       X              X",
      "X       X              X",
      "XXXXXXXXXXXXX          X",
      "O                      X",
      "O                      X",
      "O W                    X",
      "XXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[3][9] = new Level(builder, 3, 9, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                                    O",
      "O                                    O",
      "O W                               E  O",
      "XXXXXXXXXXX                XXXXXXXXXXX",
      "XXXXXXXXX                  XXXXXXXXXXX",
      "XXXXXXXXX                  XXXXXXXXXXX",
      "X                          XXXXXXXXXXX",
      "X                   XXXXXXXXXXXXXXXXXX",
      "X                   XXXXXXXXXXXXXXXXXX",
      "X                   XXXXXXXXXXXXXXXXXX",
      "X                   XXXXXXXXXXXXXXXXXX",
      "X             XXXXXXXXXXXXXXXXXXXXXXXX",
      "X             XXXXXXXXXXXXXXXXXXXXXXXX",
      "X         S   XXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[2][6] = new Level(builder, 2, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                X",
      "X                                X",
      "X                  H             X",
      "X                                X",
      "X                                X",
      "X                                X",
      "X                                X",
      "X                                X",
      "O                                X",
      "O                                X",
      "O  E                             X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);


    builder = [
      "XXXXXXXX111111XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X      X      X                                X",
      "X      X      X                                X",
      "X      X  N   X                                X",
      "X      X      X                                X",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                 X      X                     X",
      "O                 X      X                     X",
      "O                 X      X                     X",
      "O W               X      X                     X",
      "XXXXXXXXXXXXXXXXXXX111111XXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[5][8] = new Level(builder, 5, 8, this.game);

    this.currentRoom = this.rooms[2][6];
  } else if (name === "World 1") {
    var builder = [];

    builder = [
      "XXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X      X      X                                X",
      "X      X      X                                X",
      "X      X  N   X                                X",
      "X      X      X                                X",
      "X                                              X",
      "X                                              X",
      "X        C                            C        X",
      "X                                              X",
      "X                 X      X                     X",
      "O                 X      X                     X",
      "O                 X      X                     X",
      "O W               X      X                     X",
      "XXXXXXXXXXXXXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[0][7] = new Level(builder, 0, 7, this.game);

    builder = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X                                              X",
    "X                                              X",
    "X                                              X",
    "X                                              X",
    "X                                              X",
    "X                                              X",
    "X                                              X",
    "X           Q     X      X                     X",
    "X                 X      X                     O",

    "X                 X      X                 E   O",
// =======
//     "X     q q         X      X    q      q         O",
//     "X                 X      X               @     O",
// >>>>>>> aa0bc3c70da0158fe609af8a946b070680e343f2
    "XXXXXXXXXXXXXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXX"
  ];
  this.rooms[0][6] = new Level(builder, 0, 6, this.game);
  }
};
