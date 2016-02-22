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
  this.generateWorld(this.makeRoomPlans(name));
};

World.prototype.makeRoomPlans = function (name) {
  var builder = [];
  //var builderLine = [];
  for (var i = 0; i < 10; i++) {
    builder[i] = [];
    for (var j = 0; j < 10; j++) {
      builder[i][j] = null;
    }
  }
  console.log(builder);
  if (name === "Area 51") {
    builder = [
      "XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O             B    X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "O         @        X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
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
      "X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
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
      "X                  X                                          O",
      "X                  X                                          O",
      "XTTTTTTTTTTTTT     X                                          O",
      "XXXXXXXXXXXXXX     X                               @          O",
      "XXXXXXXXXXXXXX     X                  TTTTTTTTTTTTTTTTTTTTTTTTT",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     XXXXXXXX           XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXX     X             TTTTTTTTTTTTTTTTTTTTT       XX",
      "X                                XXXXXXXXXXXXXXXXXXXXX       XX",
      "X B                              XXXXXXXXXXXXXXXXXXXXX       XX",
      "X                          TTTTTTXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    TTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "O                TTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "O                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "O                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
      "XTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
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

World.prototype.generateWorld = function(plans) {
  // for (var i = 0; i < plans.length; i++) {
  //   var tempLevel = new Level(plans[i], this.game);
  //
  // }
}
