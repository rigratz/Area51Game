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
      "O             B    X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
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
      "X B           B            X     XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          XXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
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
      "XX              B                                            XX",
      "O                                                            XX",
      "O            XX           XX B          XX    B              XX",
      "O            XX           XX            XX                   XX",
      "O            XX           XX            XX                   XX",
      "O            XX           XX            XX                   XX",
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
      "O                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "O                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "O                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX"

    ];
    this.rooms[0][5] = new Level(builder, 0, 5, this.game);
    this.currentRoom = this.rooms[0][6];
  }
};
