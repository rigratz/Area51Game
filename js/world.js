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
      "XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O              B   X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O  @               X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X B                XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X     B            XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                                         XX",
      "XXXXXXXXXXXXXX     X                                         XX",
      "XXXXXXXXXXXXXX     X                                         XX",
      "XXXXXXXXXXXXXX     X                                         XX",
      "XXXXXXXXXXXXXX     X       X     XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X       Q            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X  S             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XX                                                           XX",
      "XX              B            B                   B           XX",
      "O                                                            XX",
      "O            XX           XX            XX                   XX",
      "O            XX           XX            XX                    O",
      "O            XX           XX            XX                    O",
      "O            XX           XX            XX                    O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[0][6] = new Level(builder, 0, 6, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                  X                                          O",
      "X                  X        B                                 O",
      "X                  X                                          O",
      "XXXXXXXXXXXXXX     X                                          O",
      "XXXXXXXXXXXXXX     X                                      @   O",
      "XXXXXXXXXXXXXX     X             XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X  S               XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     XXXXXXXX           XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                XXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X             XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                                XXXXXXXXXXXXXXXXXXXXX       XX",
      "X B                              XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX"

    ];
    this.rooms[0][5] = new Level(builder, 0, 5, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                                              X",
      "X                 X      X                     X",
      "O                 X      X                     X",
      "O                 X      X                     X",
      "O  @              X      X                     X",
      "XXXXXXXXXXXXXXXXXXX111111XXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[0][7] = new Level(builder, 0, 7, this.game);

    this.currentRoom = this.rooms[0][6];
  } else if (name === "World 1") {
    var builder = [];

    builder = [
      "XXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X      X      X                                X",
      "X      X      X              C                 X",
      "X      X  @   X                                X",
      "X      X      X                 C              X",
      "X                                              X",
      "X        C                            C        X",
      "X                                              X",
      "X                 X      X                     X",
      "O                 X      X                     X",
      "O                 X      X                     X",
      "O                 X      X                     X",
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
    "X     q q         X      X    q      q         O",
    "X                 X      X               @     O",
    "XXXXXXXXXXXXXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXX"
  ];
  this.rooms[0][6] = new Level(builder, 0, 6, this.game);
  }
};
