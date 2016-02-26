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
      "                                                ",
      "                                                ",
      "X                                               ",
      "X                                               ",
      "X                   1                           ",
      "X                                               ",
      "X                                              O",
      "X                                              O",
      "X                                              O",
      "X  W      s                                    O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

    ];
    this.rooms[0][6] = new Level(builder, 0, 6, this.game);
    //this.rooms[9][1] = new Level(builder, 9, 1, this.game);
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
      "XXXXXOOOOOOXXXXX"
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
      "O              XXXX      XXXX     X    Q       X",
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
      "X              Q                 O",
      "X         q                      O",
      "X                                O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);
    //this.rooms[9][0] = new Level(builder, 9, 0, this.game);


    builder = [
      "X11111111111111111111111111111111111111X",
      "XXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X      X      X                        X",
      "X      X  N   X                        X",
      "X      X      X                        X",
      "X                                      X",
      "X                                      X",
      "X                                      X",
      "O                 X      X             O",
      "O                 X      X             O",
      "O W               X      X          E  O",
      "XXXXXXXXXXXXXXXXXXX      XXXXXXXXXXXXXXX",
      "X11111111111111111111111111111111111111X"
    ];
    this.rooms[5][8] = new Level(builder, 5, 8, this.game);

    builder = [
      "X11111111111111X",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "O              O",
      "O              O",
      "O W         E  O",
      "XXXXXXXXXXXXXXXX",
      "X11111111111111X"
    ];
    this.rooms[5][7] = new Level(builder, 5, 7, this.game);
    //this.rooms[9][2] = new Level(builder, 9, 2, this.game);

    builder = [
      "XXXXOOOOOXXXXXXXXXXXXXXXX",
      "X               X       X",
      "X               X       X",
      "X    N          X  Q    X",
      "XXXXXXXXX       X       X",
      "X       X       X       X",
      "X C     X       XXXXXXXXX",
      "X       X       X       X",
      "X       X       X   q   X",
      "X       X       X       X",
      "XXXXXXXXX       XXXXXXXXX",
      "X       X               O",
      "X  q    X               O",
      "X       X           E   O",
      "XXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[3][6] = new Level(builder, 3, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X       C      D       B        X",
      "X                       Q       X",
      "X  q                            X",
      "X                               X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                               X",
      "X                               X",
      "X                               X",
      "X                  S            X",
      "O           XXX    XXX          O",
      "O           XXX    XXX          O",
      "O W         XXX    XXX      E   O",
      "XXXXXXXXXXXXXXXOOOOXXXXXXXXXXXXXX"
    ];
    this.rooms[3][7] = new Level(builder, 3, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                               X",
      "X   Q          Q          Q     X",
      "X                               X",
      "X                               X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                               X",
      "X         q        q            X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                               O",
      "O                               O",
      "O W                         E   O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];

    this.rooms[3][8] = new Level(builder, 3, 8, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXOOOOXXXXXXXXXXXXXXXXXXXXX",
      "X       X                                     X",
      "X       X  Q                                  O",
      "X       X              N                      O",
      "X    XXXXXXXXXXXXX    XXXX                E   O",
      "X                        X            XXXXXXXXX",
      "X           D      D     X                    X",
      "X                        X q                  X",
      "X                        XXXXXXXXX            X",
      "XXXXXXXXX                                     X",
      "X                                             X",
      "X                                     XXXXXXXXX",
      "X                                     X       X",
      "X                 XXXXXXXXXXXXXX      X       X",
      "X                              X      X       X",
      "X                              X q    X       X",
      "XXXXXXXXXXXXXX                 XXXXXXXX       X",
      "O                              XXXXXXXX       X",
      "O                              XXXXXXXX       X",
      "O W                                           X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][7] = new Level(builder, 4, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                             X",
      "X        B        B           X",
      "XXXX                          X",
      "O  X                          O",
      "O  X                          O",
      "O WX                       E  O",
      "XXXXX       XXXXX       XXXXXXX",
      "X               X             X",
      "X               X             X",
      "X               X             X",
      "X               XXXXX         X",
      "X                             X",
      "X   S                    XXXXXX",
      "XXXXXX    XX     Q       XXXXXX",
      "XXXXXX    XX             XXXXXX",
      "XXXXXX    XX             XXXXXX",
      "XXXXXXOOOOXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][6] = new Level(builder, 4, 6, this.game);

    builder = [
      "XXXXXXOOOOXXXXXX",
      "X              X",
      "X q            X",
      "X      N       X",
      "XXXXXXXXXX     X",
      "X  B           X",
      "X              X",
      "X            XXX",
      "X              X",
      "X       XXX    X",
      "XXXX           X",
      "XXXX           X",
      "XXXX           X",
      "XXXXXXXX       X",
      "O     XX       O",
      "O     XX       O",
      "O W    q    E  O",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[5][6] = new Level(builder, 5, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "O       XXXXXXXX",
      "O       XXXXXXXX",
      "O W     XXXXXXXX",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][8] = new Level(builder, 4, 8, this.game);

    builder = [
      "XXXXXXXXXXXOOOOX",
      "X              X",
      "X              X",
      "X           N  X",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X      XX  XXXXX",
      "O      XX  XXXXX",
      "O    XXXXXXXXXXX",
      "O W  XXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[5][9] = new Level(builder, 5, 9, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X        S     X",
      "X   XXXXXXX    X",
      "X   XXXXXXX    X",
      "X   XXXXXXX    X",
      "XXXXXXXXXXXOOOOX"
    ];
    this.rooms[4][9] = new Level(builder, 4, 9, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "XXXXX          X",
      "X              X",
      "X              X",
      "X              X",
      "XXXXXXXXX      X",
      "X              X",
      "X    ENSW  XXXXX",
      "X          XXXXX",
      "X              X",
      "X       XXXXXXXX",
      "X   X   XXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[0][0] = new Level(builder, 0, 0, this.game);

    this.currentRoom = this.rooms[0][6];
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
    "X                 X      X                     O",
    "X                 X      X                 E   O",
    "XXXXXXXXXXXXXXXXXXX000000XXXXXXXXXXXXXXXXXXXXXXX"
  ];
  this.rooms[0][6] = new Level(builder, 0, 6, this.game);
  }
};
