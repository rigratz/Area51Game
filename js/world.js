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
      "X                                               ",
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
      "X000000000000000000000000000X",
      "XXXXXXXX      XXXXXXXXXXXXXX0",
      "X      X      X          XXX0",
      "X      X  N   X          XXX0",
      "X      X      X          XXX0",
      "X                        XXX0",
      "X                        XXX0",
      "X                        XXX0",
      "O           B     X      XXX0",
      "O                 X      XXX0",
      "O W    u          X      XXX0",
      "XXXXXXXXXXXXXXXXXXX      XXX0",
      "X000000000000000000000000000X"
    ];
    this.rooms[5][5] = new Level(builder, 5, 5, this.game);

    builder = [
      "X11111111111111X",
      "1XXXXXXXXXXXXXXX",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             O",
      "1X             O",
      "1X S      s E  O",
      "1XXXXX    XXXXXX",
      "X1111XOOOOX1111X"
    ];
    this.rooms[5][4] = new Level(builder, 5, 4, this.game);

    builder = [
      "XXXXXXOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                            X",
      "X                                            X",
      "X      N                                     X",
      "XXXXXXXXX                                    X",
      "XXXXXXXXX                                    X",
      "XXXXXXXXX                                    X",
      "XXXXXXXXXXXXXXXX                             X",
      "XXXXXXXXXXXXXXXX                             O",
      "XXXXXXXXXXXXXXXX                             O",
      "X     XXXXXXXXXXXXXXXXX                   E  O",
      "X     XXXXXXXXXXXXXXXXX                  XXXXX",
      "O     XXXXXXXXXXXXXXXXX                  XXXXX",
      "O     XXXXXXXXXXXXXXXXX                  XXXXX",
      "O W                                      XXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[6][4] = new Level(builder, 6, 4, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXX",
      "X                      X",
      "X                      X",
      "X                      X",
      "X         XXXXX        X",
      "X                      X",
      "X         q    q       X",
      "X                      X",
      "X    XXXXXX   XXXXXX   X",
      "O                      O",
      "O                      O",
      "O W                 E  O",
      "XXXXXXXXXXXXXXXXXXXXXXXX",

    ];
    this.rooms[6][5] = new Level(builder, 6, 5, this.game);
    builder = [
      "XXXXXXXXXOOOOXXXXXXXXXXX",
      "X   Q                  X",
      "X                      X",
      "X          N           X",
      "XXXXXXXXXXXXXXXXX      X",
      "X                      O",
      "X        C             O",
      "X                   E  O",
      "X                 XXXXXX",
      "X                      X",
      "X                      X",
      "X                      X",
      "X       XXXXXXXXX      X",
      "O       XXX            X",
      "O    XXXXXX            X",
      "O W  XXXXXX     S      X",
      "XXXXXXXXXXXOOOOXXXXXXXXX",

    ];
    this.rooms[6][6] = new Level(builder, 6, 6, this.game);

    builder = [
      "XXXXXXXOOOOXXXXX",
      "X              X",
      "X              X",
      "X       N      X",
      "X     XXXXXXXXXX",
      "X          D   X",
      "X              X",
      "X              X",
      "XXXXXXXX       X",
      "X  D           X",
      "X              X",
      "X              X",
      "X              X",
      "X      XXXXXXXXX",
      "X             XX",
      "X             XX",
      "X             XX",
      "XXXXXXXXX     XX",
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "O         XXXXXX",
      "O         XXXXXX",
      "O W       XXXXXX",
      "XXXXXXXXXXXXXXXX",

    ];
    this.rooms[6][7] = new Level(builder, 6, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "O              X",
      "O              X",
      "O W     XX     X",
      "XXXX    XX     X",
      "XXXX  XXXXXX   X",
      "XXXX  XXXXXX   X",
      "XXXXXXXXXXXXXXXX",

    ];
    this.rooms[6][8] = new Level(builder, 6, 8, this.game);

    builder = [
      "XXXOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                O",
      "X                                O",
      "X   N                         E  O",
      "XXXXXXXX              XXXXXXXXXXXX",
      "X                                X",
      "X                                X",
      "X                                X",
      "X         XXXX                   X",
      "X         XXXX                   X",
      "X   S     XXXX                   X",
      "XXXXXX    XXXX                   X",
      "XXXXXXOOOOXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[5][7] = new Level(builder, 5, 7, this.game);
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                                X",
      "O                                X",
      "O W                              X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXX    XXXXXXXX    XXXXXXXX    XXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"


    ];
    this.rooms[5][8] = new Level(builder, 5, 8, this.game);

    builder = [
      "XXXXXXXOOOOXXXXX",
      "X              X",
      "X              X",
      "X       N      X",
      "X     XXXXXXXXXX",
      "X              X",
      "X      q       X",
      "X              X",
      "XXXXXXXXXXX    X",
      "X              X",
      "X              X",
      "X        q     X",
      "X              X",
      "X   XXXXXXXXXXXX",
      "X       Q      X",
      "X              X",
      "X              X",
      "XXXXXXXXXXXX   X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X         XXXXXX",
      "X         XXXXXX",
      "X  S      XXXXXX",
      "XXXXXXOOOOXXXXXX",

    ];
    this.rooms[7][6] = new Level(builder, 7, 6, this.game);

    builder = [
      "XXXXXXOOOOXXXXXX",
      "XXXXXX    XXXXXX",
      "XX        XXXXXX",
      "XX     N  XXXXXX",
      "XX        XXXXXX",
      "XX     XXXXXXXXX",
      "XX     X  D    X",
      "XX     X       X",
      "O    XXX       X",
      "O    XXX       X",
      "O W  XXX       X",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[8][6] = new Level(builder, 8, 6, this.game);
    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X         XXXXXX",
      "XXXXXX         X",
      "X              X",
      "X              X",
      "X              O",
      "XXXXXXXXX      O",
      "XXXXXXXXXXX E  O",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[8][5] = new Level(builder, 8, 5, this.game);

    builder = [
      "XXXXXXXXXOOOOXXXXXXXXXXXXX",
      "X                        X",
      "X                        X",
      "X         N              X",
      "X      XXXXXXXXX         X",
      "X    B            B      X",
      "X                        X",
      "X                        X",
      "XXX                      X",
      "X                        X",
      "X      XXXXXX            X",
      "X         XXX            X",
      "X         XXX            X",
      "X         XXXXXXXX       X",
      "XXXXXX    XXX            O",
      "X         XXX            O",
      "X         XXX         E  O",
      "O         XXX         XXXX",
      "O      XXXXXX   S     XXXX",
      "O W    XXXXXXXXXXX    XXXX",
      "XXXXXXXXXXXXXXXXXXOOOOXXXX"
    ];
    this.rooms[4][6] = new Level(builder, 4, 6, this.game);

    builder = [
      "XXXXXXXXXXOOOOXXXX",
      "X D           XXXX",
      "X             XXXX",
      "X          N  XXXX",
      "X         XXXXXXXX",
      "X      XXXX D    X",
      "X      XXXX      X",
      "X      XXXX      X",
      "XXXX             X",
      "XXXX             X",
      "XXXX             X",
      "XXXXXXXXXXX      X",
      "X                X",
      "X                X",
      "XQ         S     X",
      "XXXXXXOOOOXXXXXXXX"
    ];
    this.rooms[5][6] = new Level(builder, 5, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXOOOOX",
      "X                       X",
      "X                       X",
      "X                    N  X",
      "X                       X",
      "X                       X",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X     B           XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "O              XXXXXXXXXX",
      "O              XXXXXXXXXX",
      "O W            XXXXXXXXXX",
      "XXXXXX         XXXXXXXXXX",
      "XXXXXX         XXXXXXXXXX",
      "XXXXXX     S   XXXXXXXXXX",
      "XXXXXX    XXXXXXXXXXXXXXX",
      "XXXXXXOOOOXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][7] = new Level(builder, 4, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "XX             X",
      "XX             X",
      "XX             X",
      "XXXXX          X",
      "XXXXXXXX S     X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXXOOOOX"
    ];
    this.rooms[3][7] = new Level(builder, 3, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXOOOOXXXXXXXXXXXXXXX",
      "O                                   X",
      "O                                   X",
      "O W         D      N                X",
      "XXXXXX           XXXXXXXXX        q X",
      "X                              XXXXXX",
      "X                                   X",
      "X  D                                X",
      "X                                   X",
      "X                     XXXXXXX       X",
      "X                                   X",
      "X                                   X",
      "X         XXXXXXXX                  X",
      "X                                   X",
      "X                                   X",
      "X                                   X",
      "XXXXXXX                             O",
      "XXXXXXX           Q                 O",
      "XXXXXXX                          E  O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][5] = new Level(builder, 4, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              O",
      "X              O",
      "X           E  O",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "X       XXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[4][4] = new Level(builder, 4, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXX",
      "X  B                   X",
      "X                   D  X",
      "X                      X",
      "O                      X",
      "O                      X",
      "O W   XXXXXXXXXXX      X",
      "XXXXXXXX               X",
      "XXXXXX               XXX",
      "X C                  XXX",
      "X                    XXX",
      "X          S         XXX",
      "X       XXXXX    XXXXXXX",
      "XXXXXXXXXXXXXOOOOXXXXXXX",

    ];

    this.rooms[3][5] = new Level(builder, 3, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXX",
      "X    X D  X D  X     X",
      "X    X    X    X     X",
      "X    X    X    X     X",
      "X                    O",
      "O                    O",
      "O                 E  O",
      "O W            XXXXXXX",
      "XXXXXX         XXXXXXX",
      "XXXXXX     XXXXXX    X",
      "XXXXXX     XXXXXX    X",
      "XXXXXX               X",
      "XXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[3][4] = new Level(builder, 3, 4, this.game);

    builder = [
      "XXXXXXXXXXXOOOOXXXXXXX",
      "XX             XXXXXXX",
      "XX             XXXXXXX",
      "XX          N  XXXXXXX",
      "XX         XXXXX     X",
      "O          XXXX      O",
      "O          XXXX      O",
      "O W        XXXX   E  O",
      "XXXXXX     XXXX  XXXXX",
      "XXXXXX           XXXXX",
      "XXXXXX           XXXXX",
      "XXXXXX           XXXXX",
      "XXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[3][3] = new Level(builder, 3, 3, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              O",
      "X              O",
      "X           E  O",
      "X     XX    XXXX",
      "X     XX    XXXX",
      "X   XXXXXX  XXXX",
      "X   XXXXXX  XXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[3][2] = new Level(builder, 3, 2, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X D    D       O",
      "X              O",
      "X           E  O",
      "X Q        XXXXX",
      "X              X",
      "X              X",
      "XXXXXXXXX      X",
      "X              X",
      "X              X",
      "X           XXXX",
      "X              X",
      "X              X",
      "X  S           X",
      "XXXXX    XXX   X",
      "XXXXXOOOOXXXXXXX"
    ];
    this.rooms[2][3] = new Level(builder, 2, 3, this.game);
    //Pre-Boss Chamber
    builder = [
      "XXXXXXOOOOXXXXXX",
      "XXX  X    X  XXX",
      "XX            XX",
      "O      N       O",
      "O              O",
      "O W  XXXXXX E  O",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"

    ];
    this.rooms[2][4] = new Level(builder, 2, 4, this.game);

    //Boss
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XX                                                      X",
      "XX                                                      X",
      "O                                                       X",
      "O                                                       X",
      "O W                                                   s X",
      "XXXXX        XXXXXX        XXXXXX        XXXXXXX   XXXXXX",
      "X                                              X        X",
      "X                                              X        X",
      "X                                              X        X",
      "X                                              XXXXX    X",
      "X                                                       X",
      "X                                                       X",
      "X                                                     XXX",
      "X                                                     XXX",
      "X                                                     XXX",
      "X                                      H              XXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);

    builder = [
      "XXXXXOOOOXXXXXXX",
      "XXXXX    XXXXXXX",
      "X              X",
      "X      N       X",
      "X              X",
      "X    XXXXXX    X",
      "X              X",
      "X      B       X",
      "X              X",
      "XXXXX       XXXX",
      "X              X",
      "X              X",
      "X              X",
      "X     XXXXX    X",
      "X              X",
      "X              X",
      "X  S           X",
      "XXXXX    XXXXXXX",
      "XXXXXOOOOXXXXXXX"

    ];
    this.rooms[3][6] = new Level(builder, 3, 6, this.game);

    builder = [
      "XXXXXOOOOXXXXXXXXXXXXXXXXXXXX",
      "X   X    X                  X",
      "X                    D      X",
      "X     N                     X",
      "X                           X",
      "X     XX                    X",
      "X    XXXX                   X",
      "XXXXXXXXXXXXXXXXXXXX        X",
      "X                           X",
      "X                           X",
      "X                       XXXXX",
      "X           XX       Q  XXXXX",
      "X        S  XX          XXXXX",
      "XXXXX    XXXXX          XXXXX",
      "XXXXXOOOOXXXXXXXXXXXXXXXXXXXX"

    ];
    this.rooms[2][6] = new Level(builder, 2, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "XXX          XXX",
      "XX            XX",
      "O              X",
      "O              X",
      "O W            X",
      "XXXXX       XXXX",
      "XXXXX        XXX",
      "XXXXX          X",
      "XXXXX          X",
      "XXXXX    S     X",
      "XXXXX    XXXXXXX",
      "XXXXXOOOOXXXXXXX",
    ];
    this.rooms[1][6] = new Level(builder, 1, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXX                        XXXXX",
      "XXX                          XXXX",
      "XX                            XXX",
      "O      D          D            XX",
      "O                               X",
      "O W                             X",
      "XXXXXX    XXXXXX     XXXXXX     X",
      "X                               X",
      "X                               X",
      "X                             XXX",
      "X                             XXX",
      "X                     Q       XXX",
      "X                           XXXXX",
      "X                           XXXXX",
      "X       XXXXX     XXXXXXXX     XX",
      "X                              XX",
      "X              B               XX",
      "X                              XX",
      "X                               O",
      "X                               O",
      "XXXXXX                       E  O",
      "XXXXXX                      XXXXX",
      "XXXXXX                      XXXXX",
      "XXXXXX                      XXXXX",
      "X   XXXXX  Q            XXXXXXXXX",
      "X   XXXXX               XXXXXXXXX",
      "X                       XXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[1][5] = new Level(builder, 1, 5, this.game);

    builder = [
        "XXXXXXXXXXXXXXXX",
        "X              X",
        "XC             X",
        "X              X",
        "X              O",
        "X              O",
        "X      q    E  O",
        "X    XXXXXXXXXXX",
        "X              X",
        "X              X",
        "X   S          X",
        "X   XX    XX   X",
        "XXXXXXOOOOXXXXXX",
    ];

    this.rooms[1][4] = new Level(builder, 1, 4, this.game);


  }
};
