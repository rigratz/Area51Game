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
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                              O",
      "X                                              O",
      "X                                              O",
      "X  W  s                                     E  O",
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
      "X                                           XXXX",
      "XXXXXXXXXX                                   XXX",
      "X  B     X                                    XX",
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
      "XX             X",
      "O              X",
      "O       S      X",
      "O W    XXX     X",
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
      "X    p XX     XX",
      "X      XX      O",
      "X    XXXXXX    O",
      "X    XXXXXX E  O",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[1][8] = new Level(builder, 1, 8, this.game);
    this.rooms[1][8].saveRoom = true;
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
      "X        S    XXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXX     XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[2][6] = new Level(builder, 2, 6, this.game);

    // builder = [
    //   "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //   "X                                X",
    //   "X                                X",
    //   "X                                X",
    //   "X                                X",
    //   "X                                X",
    //   "X                                X",
    //   "X                               XX",
    //   "X              Q                 O",
    //   "X         q                      O",
    //   "X                                O",
    //   "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    // ];
    // this.rooms[2][5] = new Level(builder, 2, 5, this.game);
    //this.rooms[9][0] = new Level(builder, 9, 0, this.game);


    builder = [
      "X11111111111111111111111111111111111111X",
      "XXXXXXXX      XXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X      X      X                        X",
      "X      X  N   X                        X",
      "X      X      X                        X",
      "X                                      X",
      "X                                      X",
      "XX                                    XX",
      "O                 X      X             O",
      "O                 X      X             O",
      "O W               X      X          E  O",
      "XXXXXXXXXXXXXXXXXXX      XXXXXXXXXXXXXXX",
      "X11111111111111111111111111111111111111X"
    ];
    this.rooms[5][8] = new Level(builder, 5, 8, this.game);
    this.rooms[5][8].portalRoom = true;

    builder = [
      "X11111111111111X",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "XX            XX",
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
      "XXXXX                       XXXXX",
      "XXXX                         XXXX",
      "XXX                           XXX",
      "XX                 S           XX",
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
      "X       X                                    XX",
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
      "XXXX                       XXXX",
      "XXX      B        B         XXX",
      "XX                           XX",
      "O                             O",
      "O                             O",
      "O W                        E  O",
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
      "XXXXXXXX     XXX",
      "O              O",
      "O              O",
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
      "XX      XXXXXXXX",
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
      "XX   p XX  XXXXX",
      "O      XX  XXXXX",
      "O    XXXXXXXXXXX",
      "O W  XXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[5][9] = new Level(builder, 5, 9, this.game);
    this.rooms[5][9].saveRoom = true;

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
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXX                                O",
      "XXXX                                 O",
      "XXX                               E  O",
      "XX                              XXXXXX",
      "O                               XXXXXX",
      "O                               XXXXXX",
      "O W                             XXXXXX",
      "XXXXXXX      XXXXXX        XXXXXXXXXXX",
      "X                                    X",
      "X  C                     C           X",
      "X                                    X",
      "X                                    X",
      "X             XXXX                   X",
      "X                                    X",
      "X                                    X",
      "X                         XXXXXX     X",
      "XXXXXXX                              X",
      "X                                    X",
      "X                                    X",
      "X          XX        XX            XXX",
      "X  Q       XXS       XX Q          XXX",
      "X          XXXX    XXXX            XXX",
      "X          XXXX    XXXX            XXX",
      "XXXXXXXXXXXXXXXOOOOXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);

    builder = [
      "XXXXXXOOOOXXXXXX",
      "X    X    X    X",
      "X              X",
      "X      N       X",
      "X         XXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "XXXXXX         X",
      "O              X",
      "O              X",
      "O W            X",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[3][5] = new Level(builder, 3, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X D        D   X",
      "X              X",
      "X              X",
      "X     XXXX     X",
      "X        X     X",
      "X        X     X",
      "XXX      X   XXX",
      "XXX      X     O",
      "XXXS     X     O",
      "XXXXX    X  E  O",
      "XXXXXOOOOXXXXXXX"
    ];
    this.rooms[3][4] = new Level(builder, 3, 4, this.game);

    builder = [
      "XXXXXOOOOXXXXXXX",
      "XXXXX          X",
      "XXXX           X",
      "XXX   N        X",
      "XX             X",
      "X              X",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "XXXX       XXXXX",
      "XXXX           X",
      "XXXX       C   X",
      "XXXX           X",
      "XXXX           X",
      "XXXX           X",
      "XXXX  S        X",
      "XXXXXXXX    XXXX",
      "XXXXXXXXOOOOXXXX",
    ];
    this.rooms[4][4] = new Level(builder, 4, 4, this.game);

    builder = [
      "XXXXXXXXOOOOXXXX",
      "X           XXXX",
      "X           XXXX",
      "X        N  XXXX",
      "X           XXXX",
      "X       XXXXXXXX",
      "X        C     X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "XQ             X",
      "X        S     X",
      "X       XXX    X",
      "XXXXXXXXXXXOOOOX"
    ];
    this.rooms[5][4] = new Level(builder, 5, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXOOOOX",
      "X      C        X    X",
      "X                    X",
      "X                 N  X",
      "XXXX                 X",
      "X                XXXXX",
      "X C              XXXXX",
      "X                XXXXX",
      "X                XXXXX",
      "X            XXXXXXXXX",
      "X            XXXXXXXXX",
      "X            XXXXXXXXX",
      "X            XXXXXXXXX",
      "XX       XXXXXXXXXXXXX",
      "O        XXXXXXXXXXXXX",
      "O        XXXXXXXXXXXXX",
      "O W      XXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[6][4] = new Level(builder, 6, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X        X D    X        X",
      "X        X      X        X",
      "X        X      X        X",
      "X                        X",
      "X                        X",
      "X                        X",
      "X                        X",
      "XX    X     X     X     XX",
      "O     X D   X D   X      O",
      "O     X     X     X      O",
      "O W   X     X     X   E  O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];

    this.rooms[6][3] = new Level(builder, 6, 3, this.game);

    builder = [
      "XXXOOOOXXXXXXXXXXXXXXXXXXX",
      "X                        X",
      "X                        X",
      "X N                      X",
      "X                        X",
      "XXXX               XX    X",
      "X                  XX    X",
      "X                  XX    X",
      "X                  XX    X",
      "XXXXXX             XX    X",
      "X                  XXXXXXX",
      "X                        O",
      "X          XXX           O",
      "X          XXX        E  O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[6][2] = new Level(builder, 6, 2, this.game);

    builder = [
      "2222222222222222",
      "XXXXXXXXXXXXXXX2",
      "XX            X2",
      "O             X2",
      "O             X2",
      "O W           X2",
      "XXXXXX        X2",
      "XXXX          X2",
      "2XX        XXXX2",
      "2XX        XXXX2",
      "2XX    S   XXXX2",
      "2XX    XXXXXXXX2",
      "22XOOOOX22222222"
    ];
    this.rooms[5][2] = new Level(builder, 5, 2, this.game);

    builder = [
      "22222222222222222222222222222",
      "2XXXXXXXXXXXXXX      XXXXXXXX",
      "2XX           X      X     XX",
      "2XX           X N    X      O",
      "2XX           X      X      O",
      "2XX                      E  O",
      "2XX                      XXXX",
      "2XX                      XXX2",
      "2XX      X               XXX2",
      "2XX      X               XXX2",
      "2XX      X               XXX2",
      "2XX      XXXXXXXXXXXXXXXXXXX2",
      "22222222222222222222222222222"
    ];
    this.rooms[5][1] = new Level(builder, 5, 1, this.game);
    this.rooms[5][1].portalRoom = true;
    builder = [
      "3333333333333333",
      "3XXXX      XXXXX",
      "3X  X      X   X",
      "3X  X  N   X   X",
      "3X  X      X   X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X             X",
      "3X            XX",
      "3X             O",
      "3X             O",
      "3X          E  O",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[4][5] = new Level(builder, 4, 5, this.game);
    this.rooms[4][5].portalRoom = true;

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X      B       X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X       XX    XX",
      "X       XX     O",
      "X S     XX     O",
      "XXXX    XX  E  O",
      "XXXXOOOOXXXXXXXX"
    ];
    this.rooms[5][5] = new Level(builder, 5, 5, this.game);

    builder = [
      "XXXXOOOOXXXXXXXX",
      "XXXX    X      X",
      "XXXX           X",
      "XXXX N         X",
      "XXXX           X",
      "XXXXXXXXX      X",
      "X              X",
      "X              X",
      "X              X",
      "X       XXXXXXXX",
      "X              X",
      "X              X",
      "X        S     X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXXOOOOX",
    ];
    this.rooms[6][5] = new Level(builder, 6, 5, this.game);

    builder = [
      "XXXXXXXXXXXOOOOX",
      "X         X    X",
      "X              X",
      "X           N  X",
      "X              X",
      "X     XXXXXXXXXX",
      "X              O",
      "X              O",
      "X           E  O",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[7][5] = new Level(builder, 7, 5, this.game);

    builder = [
      "XXXXXXXXXXXXX4444",
      "XXXXXX[ ] |XXX444",
      "XXXXX [ ] | XXX44",
      "XXXX  [ ] |  XXX4",
      "XXX   [ ] |   XXX",
      "XX    [ ] |    XX",
      "O     [ ] |     O",
      "O     [ ] |     O",
      "O W   [ ] |  E  O",
      "XXXXXXXXXXXXXXXXX",
      "XXXXXXXXXXXXXXXX4",
      "XXXXXXXXXXXXXX444",
      "XXXXXXXXXXXX44444"
    ]
    this.rooms[7][6] = new Level(builder, 7, 6, this.game);

    builder = [
      "X444444444444444444444444444X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXX4",
      "X                        XXX4",
      "X                        XXX4",
      "X        N               XXX4",
      "X                        XXX4",
      "X                        XXX4",
      "XX                       XXX4",
      "O                 X      XXX4",
      "O                 X      XXX4",
      "O W               X      XXX4",
      "XXXXXXXXXXXXXXXXXXX      XXX4",
      "X444444444444444444444444444X"
    ];

    this.rooms[7][7] = new Level(builder, 7, 7, this.game);
    this.rooms[7][7].portalRoom = true;

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X   q        q X",
      "X              X",
      "XXXXXXX   XXXXXX",
      "O              O",
      "O              O",
      "O W         E  O",
      "XXXXXXX   XXXXXX",
      "X       C      X",
      "X              X",
      "X              X",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[2][4] = new Level(builder, 2, 4, this.game);

    builder = [
      "XXXXOOOOXXXXXXXX",
      "XXXX    X      X",
      "X       X      X",
      "X    N  X      X",
      "X       X      X",
      "X       X      O",
      "X   XXXXX      O",
      "X       X   E  O",
      "X       X   XXXX",
      "X       X      X",
      "X       X      X",
      "X              X",
      "X    e         X",
      "X              X",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[2][3] = new Level(builder, 2, 3, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXX",
      "O           B        X",
      "O                    X",
      "O W                  X",
      "XXXXXX             q X",
      "X   B                X",
      "X                XXXXX",
      "X                    X",
      "X                    X",
      "X                    X",
      "X    X        X      X",
      "X    X  e     X      X",
      "X    X        X      X",
      "X    XXXXXXXXXX      X",
      "X        X           X",
      "X        X           X",
      "X        X    S      X",
      "X        X    XXXXXXXX",
      "XXXXXXXXXXOOOOXXXXXXXX"
    ];
    this.rooms[1][3] = new Level(builder, 1, 3, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X  C           O",
      "X              O",
      "X           E  O",
      "X          XXXXX",
      "X              X",
      "X              X",
      "X              X",
      "XXX            X",
      "O           B  X",
      "O              X",
      "O W            X",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[1][2] = new Level(builder, 1, 2, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                          X",
      "X          B      B        X",
      "X                          X",
      "X                          X",
      "X                          X",
      "X                          X",
      "X                          X",
      "X       X            X    XX",
      "X       X            X     O",
      "X S     X e       e  X     O",
      "XXXX    X            X  E  O",
      "XXXXOOOOXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[1][1] = new Level(builder, 1, 1, this.game);

    builder = [
      "3XXXOOOOX3333333",
      "3XXX    XXXXXXX3",
      "3XXX          X3",
      "3XXX N        X3",
      "3XXX          X3",
      "XXXXXXXXXXX   X3",
      "XX            X3",
      "XX            X3",
      "O             X3",
      "O             X3",
      "O W           X3",
      "XXXXXXXXXXXXXXX3",
      "3333333333333333"
    ];
    this.rooms[2][1] = new Level(builder, 2, 1, this.game);

    builder = [
      "33333333333333333333333333333",
      "3XXXXXXXXXXXXXX      XXXXXXX3",
      "3XX           X      X     X3",
      "3XX           X N    X     X3",
      "3XX           X      X     X3",
      "3XX                        X3",
      "3XX                        X3",
      "3XX                        XX",
      "3XX      X                  O",
      "3XX      X                  O",
      "3XX      X               E  O",
      "3XX      XXXXXXXXXXXXXXXXXXXX",
      "33333333333333333333333333333"
    ];
    this.rooms[2][0] = new Level(builder, 2, 0, this.game);
    this.rooms[2][0].portalRoom = true;

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
      "XX                       XXX0",
      "O           C     X      XXX0",
      "O                 X      XXX0",
      "O W               X      XXX0",
      "XXXXXXXXXXXXXXXXXXX      XXX0",
      "X000000000000000000000000000X"
    ];
    this.rooms[5][5] = new Level(builder, 5, 5, this.game);
    this.rooms[5][5].portalRoom = true;

    builder = [
      "X11111111111111X",
      "1XXXXXXXXXXXXXXX",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X             X",
      "1X            XX",
      "1X             O",
      "1X             O",
      "1X S        E  O",
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
      "XXXXXXXXXXXXXXXX                            XX",
      "XXXXXXXXXXXXXXXX                             O",
      "XXXXXXXXXXXXXXXX                             O",
      "XX    XXXXXXXXXXXXXXXXX                   E  O",
      "XX    XXXXXXXXXXXXXXXXX                  XXXXX",
      "O     XXXXXXXXXXXXXXXXX                  XXXXX",
      "O     XXXXXXXXXXXXXXXXX                  XXXXX",
      "O W                   X                  XXXXX",
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
      "XX   XXXXXX   XXXXXX  XX",
      "O          Q           O",
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
      "XXXXXXXXXXXXXXXXX     XX",
      "X                      O",
      "X        C             O",
      "X                   E  O",
      "X                 XXXXXX",
      "X                      X",
      "X                      X",
      "X                      X",
      "X       XXXXXXXXX      X",
      "O       XXX            X",
      "O       XXX            X",
      "O    XXXXXX    S       X",
      "O W  XXXXXX    XXXXXXXXX",
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
      "XX            XX",
      "XX             O",
      "XX             O",
      "XX          E  O",
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
      "XX             X",
      "O              X",
      "O              X",
      "O W   p XX     X",
      "XXXX    XX     X",
      "XXXX  XXXXXX   X",
      "XXXX  XXXXXX   X",
      "XXXXXXXXXXXXXXXX",

    ];
    this.rooms[6][8] = new Level(builder, 6, 8, this.game);
    this.rooms[6][8].saveRoom = true;

    builder = [
      "XXXOOOOXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                                O",
      "X                                O",
      "X   N                         E  O",
      "XXXXXXXX              XXXXXXXXXXXX",
      "X                                X",
      "X                            C   X",
      "X                                X",
      "X         XXXX                   X",
      "X         XXXX         Q         X",
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
      "X   S     XXXXXX",
      "XXXXXX    XXXXXX",
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
      "X            u X",
      "X         XXXXXX",
      "XXXXXX        XX",
      "X             XX",
      "X             XX",
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
      "X    C            C      X",
      "X                        X",
      "X                        X",
      "XXX                      X",
      "X                        X",
      "X      XXXXXX            X",
      "X         XXX            X",
      "X         XXX            X",
      "X         XXXXXXXX      XX",
      "XXXXXX    XXX            O",
      "XX        XXX            O",
      "XX        XXX         E  O",
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
      "XQ               X",
      "X                X",
      "X         S      X",
      "XXXXXX    XXXXXXXX",
      "XXXXXXOOOOXXXXXXXX"
    ];
    this.rooms[5][6] = new Level(builder, 5, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXOOOOX",
      "X                 XX    X",
      "X                       X",
      "X                    N  X",
      "X                       X",
      "X                       X",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X     C           XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "X                 XXXXXXX",
      "XX                XXXXXXX",
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
      "X                                 XXX",
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
      "XX C                   X",
      "XX                  D  X",
      "XX                     X",
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
      "X    X D  X D  X    XX",
      "X    X    X    X    XX",
      "X    X    X    X    XX",
      "XX                   O",
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
      "XX         XXXXX    XX",
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
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "X   p XX    XXXX",
      "X     XX    XXXX",
      "X   XXXXXX  XXXX",
      "X   XXXXXX  XXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[3][2] = new Level(builder, 3, 2, this.game);
    this.rooms[3][2].saveRoom = true;

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X             XX",
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "X          XXXXX",
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
      "XxX  X    X  XxX",
      "XX            XX",
      "O      N       O",
      "O         P    O",
      "O W  XXXXXX E  O",
      "XXXXXXxxxxXXXXXX",
      "XxxxxxxxxxxxxxxX",
      "XxxxxxxxxxxxxxxX",
      "XxxxxxxxxxxxxxxX",
      "XxxxxxxxxxxxxxxX",
      "XxxxxxxxxxxxxxxX",
      "XxxxxxxxxxxxxxxX"

    ];
    this.rooms[2][4] = new Level(builder, 2, 4, this.game);

    //Boss
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XX                                                    XXX",
      "XX                                                     XX",
      "O                                                       O",
      "O                       C   B   C    B    C             O",
      "O W                                                  E  O",
      "XXXXX        XXXXXX        XXXXXX        XXXXXXX   XXXXXX",
      "X                                              X        X",
      "X                                              X        X",
      "X                                            B X        X",
      "X                                              XXXXX    X",
      "X                                                       X",
      "X                                           C           X",
      "X                                            B        XXX",
      "X                                                     XXX",
      "X                                                     XXX",
      "X                                      H              XXX",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);
    this.rooms[2][5].bossRoom = true;

    builder = [
      "XXXXXOOOOXXXXXXX",
      "XXXXX    XXXXXXX",
      "X              X",
      "X      N       X",
      "X              X",
      "X    XXXXXX    X",
      "X              X",
      "X      C       X",
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
      "XXXXXX                      X",
      "XX  XX                      X",
      "O    X                  XXXXX",
      "O    X      XX       Q  XXXXX",
      "O W sX   S  XX          XXXXX",
      "XXXXXX   XXXXX          XXXXX",
      "XXXXXXOOOXXXXXXXXXXXXXXXXXXXX"

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
      "X              C               XX",
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
        "X             XX",
        "XC            XX",
        "X             XX",
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


  } else if (name === "World 2") {
    builder = [
      "X000000000000000000000000000X",
      "XXXXXXXX      XXXXXXXXXXXXXX0",
      "X      X      X          XXX0",
      "X      X  N   X          XXX0",
      "X      X      X          XXX0",
      "X                        XXX0",
      "X                        XXX0",
      "XX                       XXX0",
      "O                 X      XXX0",
      "O                 X      XXX0",
      "O W               X      XXX0",
      "XXXXXXXXXXXXXXXXXXX      XXX0",
      "X000000000000000000000000000X"
    ];
    this.rooms[2][7] = new Level(builder, 2, 7, this.game);
    this.rooms[2][7].portalRoom = true;

    builder = [
      "X00000000000000X",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "XX            XX",
      "O              O",
      "O              O",
      "O W         E  O",
      "XXXXXXXXXXXXXXXX",
      "X00000000000000X"
    ];
    this.rooms[2][6] = new Level(builder, 2, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXOOOOXXXXX",
      "XXXX                   X    XXXXX",
      "XXX                          XXXX",
      "XX                       N   XXXX",
      "XX                           XXXX",
      "O               XXXXXXXXXXXXXXXXX",
      "O               XX             XX",
      "O W             XX              O",
      "XXXXXXX         XX              O",
      "X               XX           E  O",
      "X               XX    XXXXXXXXXXX",
      "X           XXXXXX              X",
      "X                               X",
      "X                      k        X",
      "X                               X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[2][5] = new Level(builder, 2, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXX",
      "X                  O",
      "X                  O",
      "X   C           E  O",
      "X           XXXXXXXX",
      "X                  X",
      "X                  X",
      "X                  X",
      "XX                 X",
      "O                  X",
      "O        S         X",
      "O W     XXX        X",
      "XXXXXXXXXXXOOOOXXXXX",

    ];
    this.rooms[1][5] = new Level(builder, 1, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X    p XX     XX",
      "X      XX      O",
      "X    XXXXXX    O",
      "X    XXXXXX E  O",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[1][4] = new Level(builder, 1, 4, this.game);
    this.rooms[1][4].saveRoom = true;

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X         XXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "XX             X",
      "O              X",
      "O              X",
      "O W            X",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[1][6] = new Level(builder, 1, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "XX         XXXXX",
      "X           XXXX",
      "X            XXX",
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "X         XXXXXX",
      "X              X",
      "X              X",
      "X  k           X",
      "X              X",
      "XXXXX          X",
      "XXXX           X",
      "XXX            X",
      "XXX            X",
      "XXX    S       X",
      "XXX    XXXXXXXXX",
      "XXXOOOOXXXXXXXXX",
    ];
    this.rooms[2][4] = new Level(builder, 2, 4, this.game);

    builder = [
      "XXXOOOOXXXXXXXXX",
      "XXX    XXXXXXXXX",
      "XXX            X",
      "XXX N          X",
      "XXX            X",
      "XXXXXXXXXX     X",
      "XXXXX          X",
      "XXXX           X",
      "XXX            X",
      "XX        XXXXXX",
      "O              X",
      "O              X",
      "O W            X",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[3][4] = new Level(builder, 3, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXX",
      "XXX                   X",
      "XX                    X",
      "O                     X",
      "O                     X",
      "O W                   X",
      "XXXX                  X",
      "X         XX          X",
      "X         XX        XXX",
      "X         XX          X",
      "X         XX          X",
      "X     XXXXXX          X",
      "X         XX          X",
      "X         XX     XXXXXX",
      "X         XX          O",
      "X   S     XX          O",
      "XXXXXX    XX       E  O",
      "XXXXXXOOOOXXXXXXXXXXXXX",
    ];
    this.rooms[3][3] = new Level(builder, 3, 3, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X            XXX",
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "X          XXXXX",
      "X          XXXXX",
      "X          XXXXX",
      "X     k    XXXXX",
      "XX     XXXXXXXXX",
      "O      XXXXXXXXX",
      "O      XXXXXXXXX",
      "O W    XXXXXXXXX",
      "XXXXXXXXXXXXXXXX",
    ];
    this.rooms[3][2] = new Level(builder, 3, 2, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X      X       X",
      "X      X       X",
      "X      X       X",
      "X    XXX       X",
      "X      X       X",
      "X      X       X",
      "X      X       X",
      "X      X       X",
      "X      X      XX",
      "X      X       O",
      "XS     X       O",
      "XXX    X    E  O",
      "XXXOOOOXXXXXXXXX",
    ];
    this.rooms[3][1] = new Level(builder, 3, 1, this.game);

    builder = [
      "XXXXXXOOOOXXXXXX",
      "XXXXXX    XXXXXX",
      "XXXXXX       XXX",
      "XXXXXX N       O",
      "XXXXXX         O",
      "XXXXXX      E  O",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "XXXXXXXXXXXXXXXX",
      "X              X",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[4][3] = new Level(builder, 4, 3, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXX                         B    X",
      "XX                               X",
      "O                                X",
      "O                                X",
      "O W                              X",
      "XXXXXXXXXXXX         XXXXXXX     X",
      "XXXXXX     X         X           X",
      "XXXXXX     X         X           X",
      "XXXXXX     X         X           X",
      "XXXXXX     X         X           X",
      "XXXXXX     X      XXXX      XXXXXX",
      "XXXXXX     X  k   X             XX",
      "XXXXXX     X      X             XX",
      "XXXXXX     XXXXXXXX      k      XX",
      "XXXXXX                XXXXXX    XX",
      "XXXXXX                           O",
      "XXXXXX    S                      O",
      "XXXXXX    XXXXX               E  O",
      "XXXXXXOOOOXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[4][4] = new Level(builder, 4, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                B                   XXX",
      "X                                     XX",
      "X                                      O",
      "X                                      O",
      "X                                   E  O",
      "X       XXX         XXXX         XXXXXXX",
      "X       XXX         XXXX               X",
      "X       XXX         XXXX               X",
      "X    XXXXXX         XXXX               X",
      "XX   XXXXXX         XXXX               X",
      "O    XXXXXXXX       XXXXXX             X",
      "O    XXXXXXXX   k   XXXXXX      k      X",
      "O W  XXXXXXXX       XXXXXX             X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[4][5] = new Level(builder, 4, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "XXX            X",
      "XX             X",
      "O              X",
      "O              X",
      "O W     r      X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX S  X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXXOOOOX"
    ];
    this.rooms[4][6] = new Level(builder, 4, 6, this.game);

    builder = [
      "XXXXXXXXXXXOOOOX",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX N  X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX S  X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXX    X",
      "XXXXXXXXXXXOOOOX"
    ];
    this.rooms[5][6] = new Level(builder, 5, 6, this.game);

    builder = [
      "XXXXXXOOOOXXXXXX",
      "X    X    X    X",
      "X              X",
      "X      N       X",
      "X              X",
      "X    XXXXXX    X",
      "X              X",
      "X              X",
      "X  k        k  X",
      "X              X",
      "XXXXXX    XXXXXX",
      "X           B  X",
      "X              X",
      "X              X",
      "X              X",
      "X   XXXXXXXXXXXX",
      "X         XXXXXX",
      "X         XXXXXX",
      "X   S     XXXXXX",
      "XXXXXX    XXXXXX",
      "XXXXXXOOOOXXXXXX"
    ];
    this.rooms[5][4] = new Level(builder, 5, 4, this.game);

    builder = [
      "XXXXXXOOOOXXXXXXXXXXXXXXXXXXXXXXXX",
      "XXXXXX    XXX         X          O",
      "XXXXXX                X          O",
      "XXXXXX N              X       E  O",
      "XXXXXX                X     XXXXXX",
      "XXXXXXXXXXXXX         X          X",
      "XXXXXX                X          X",
      "XXXXXX           k    X          X",
      "XXXXXX                X          X",
      "XXXXXX       XXXXXXXXXXXXXX      X",
      "XXXXXX             B             X",
      "XXXXXX                           X",
      "XXXXXX                           X",
      "XXXXXX                           X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[6][4] = new Level(builder, 6, 4, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                                     O",
      "O               B        B            O",
      "O W                                E  O",
      "XXXXXX                            XXXXX",
      "XXXXXX                                X",
      "XXXXXX                                X",
      "XXXXXX                                X",
      "XXXXXXXXXX              XXXX          X",
      "XXXXXXXXXX                            X",
      "XXXXXXXXXX                            X",
      "XXXXXXXXXX                            X",
      "XXXXXXXXXXXXXXXX                      X",
      "XXXXXXXXXXXXXXXX                      X",
      "XXXXXXXXXXXXXXXX                      X",
      "XXXXXXXXXXXXXXXX        k      k      X",
      "XXXXXXXXXXXXXXXX                      X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[6][5] = new Level(builder, 6, 5, this.game);


    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXOOOOX",
      "O                 B       XXXXXXX    X",
      "O                         X          X",
      "O W                       X       N  X",
      "XXXXXXX                   X          X",
      "X                         X   XXXXXXXX",
      "X                         X          X",
      "X                         X          X",
      "X        XXXXXXX          X          X",
      "X        X                X          X",
      "X        X                X          X",
      "X        X            k   X          X",
      "X        X                X          X",
      "X   XXXXXX          XXXXXXX          X",
      "X        X                           X",
      "X        XXXX                        X",
      "X                                   XX",
      "X     k                              O",
      "X                                    O",
      "X         iXXXXXXXXXXX            E  O",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[6][6] = new Level(builder, 6, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXX",
      "X                X",
      "X         k      X",
      "X                X",
      "X       XXXXX    X",
      "X         XXX   XX",
      "X         XXX    X",
      "X         X      X",
      "XX        X      X",
      "XX        X    XXX",
      "O         X      X",
      "O       XXXS     X",
      "O W  s  XXXXX    X",
      "XXXXXXXXXXXXXOOOOX",
    ];
    this.rooms[6][7] = new Level(builder, 6, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXOOOOX",
      "XXXX         X    X",
      "XXX               X",
      "XX             N  X",
      "O                 X",
      "O            XXXXXX",
      "O W               X",
      "XXXXX             X",
      "X         k       X",
      "X                 X",
      "X       XXXXX     X",
      "X                 X",
      "X                 X",
      "X                 X",
      "XXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[7][7] = new Level(builder, 7, 7, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "X           XXXX",
      "X            XXX",
      "X             XX",
      "X              O",
      "X              O",
      "XX          E  O",
      "O          XXXXX",
      "O              X",
      "O W            X",
      "XXXXXXXX       X",
      "X            XXX",
      "X              X",
      "X         k    X",
      "X              X",
      "X S     XXXXXXXX",
      "XXXX    XXXXXXXX",
      "XXXXOOOOXXXXXXXX"
    ];
    this.rooms[7][6] = new Level(builder, 7, 6, this.game);

    builder = [
      "XXXXOOOOXXXXXXXX",
      "X       X      X",
      "X       X      X",
      "X    N  X      X",
      "X       X   XXXX",
      "X   XXXXX   XXXX",
      "X       X   XXXX",
      "X       X   XXXX",
      "X       X   XXXX",
      "XXX         XXXX",
      "XXX         XXXX",
      "XXX         XXXX",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[8][6] = new Level(builder, 8, 6, this.game);

    builder = [
      "XXXXXXXXXXXXXXXX",
      "XXXXD  XD  XXXXX",
      "X  X   X   X X X",
      "XXXX   X   XXXXX",
      "XX            XX",
      "XX            XX",
      "XX            XX",
      "O              O",
      "O              O",
      "O W         E  O",
      "XXXXXXXXXXXXXXXX",
      "X X X X  X X X X",
      "XXXXXXXXXXXXXXXX"

    ];
    this.rooms[7][5] = new Level(builder, 7, 5, this.game);

    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXX",
      "X                       X",
      "X                       X",
      "X                       X",
      "X                       X",
      "X                       X",
      "X                       X",
      "O                       O",
      "O                       O",
      "O W                  E  O",
      "XXXXXXX         XXXXXXXXX",
      "XXXXXXX         XXXXXXXXX",
      "XXXXXXX       XXXXXXXXXXX",
      "XXXXXXX         XXXXXXXXX",
      "XXXXXXXXX       XXXXXXXXX",
      "XXXXXXXXX    S  XXXXXXXXX",
      "XXXXXXXXX    XXXXXXXXXXXX",
      "XXXXXXXXXOOOOXXXXXXXXXXXX"
    ];
    this.rooms[7][4] = new Level(builder, 7, 4, this.game);

    builder = [
      "XXXXXXXXXOOOOXXXXXXX",
      "X       X    X     X",
      "X                  X",
      "X         N        X",
      "X                  X",
      "X       XXXXXX     X",
      "X                  X",
      "X                  X",
      "XXXX             XXX",
      "X       p XX       X",
      "X         XX       X",
      "X       XXXXXX     X",
      "X       XXXXXX     X",
      "XXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[8][4] = new Level(builder, 8, 4, this.game);
    this.rooms[8][4].saveRoom = true;

    builder = [
      "XXXXXXXXXXOOOOXXXXXXXX",
      "X        X    X      X",
      "X             X      X",
      "X          N  X      X",
      "X             X      X",
      "X     XXXXXXXXX      X",
      "XXX                 XX",
      "X                    O",
      "X                    O",
      "X                 E  O",
      "XXXXXXX         XXXXXX",
      "X                    X",
      "X                    X",
      "X    k        k      X",
      "XXXXXXXXXXXXXXXXXXXXXX"
    ];
    this.rooms[7][3] = new Level(builder, 7, 3, this.game);

    builder = [
      "Xxxxxxxxxxxxxxxx",
      "XXXXXXXXxxxxxxxx",
      "O       XXXXxxxx",
      "O           Xxxx",
      "O W          Xxx",
      "XXXX          Xx",
      "xxxX          Xx",
      "xxxX          Xx",
      "xxxX        XXXx",
      "xxxX          Xx",
      "xxxX          Xx",
      "xxxX    S     Xx",
      "xxxXXXXXXX    Xx",
      "xxxxxxxxxXOOOOXx"
    ];
    this.rooms[6][3] = new Level(builder, 6, 3, this.game);

    //BOSS ROOM
    builder = [
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "O                                               XX",
      "O                                               XX",
      "O W                   k                         XX",
      "X       XXXXXXX                 XXXXX           XX",
      "XXXXX           XXXXX                           XX",
      "X                     XXXXX                      X",
      "X                           XXXXX                X",
      "X                                                X",
      "X                                                X",
      "X               k                   XXXXX        O",
      "X                                 E              O",
      "X           XXXXXXXXXXXXXXXXXX                XXXX",
      "X          X                                     X",
      "X         X                                      X",
      "X                  k              XXXXXXXX       X",
      "X                                                X",
      "X                                                X",
      "X    XXXXXXXXXXXXXXXXXX                          X",
      "X                                                X",
      "X                                                X",
      "X                     XXXX                       X",
      "X                                                X",
      "X                                       K        X",
      "X                                                X",
      "X          k                   k                 X",
      "X                   s                            X",
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ];
    this.rooms[6][2] = new Level(builder, 6, 2, this.game);
    this.rooms[6][2].bossRoom = true;

    builder = [
      "XXXXXXXXXXXOOOOX",
      "X         X    X",
      "X              X",
      "X           N  X",
      "X              X",
      "X              X",
      "X         XXXXXX",
      "X             XX",
      "X  j          XX",
      "X             XX",
      "X              O",
      "X              O",
      "X           E  O",
      "XXXXXXXXXXXXXXXX",

    ];
    this.rooms[6][1] = new Level(builder, 6, 1, this.game);

    builder = [
      "XOOOOXXXXXXXXXXX",
      "X    X         X",
      "X              X",
      "X N            X",
      "X              X",
      "XXX            X",
      "X          XXXXX",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X              X",
      "X        S     X",
      "X       XXX    X",
      "XXXXXXXXXXXOOOOX",

    ];
    this.rooms[5][1] = new Level(builder, 5, 1, this.game);

    builder = [
      "XXXOOOOXXXXXXXXX",
      "XXX            X",
      "XXX            X",
      "XXX N          X",
      "XXX            X",
      "XXX            X",
      "XXX            X",
      "XXX            X",
      "XXXXXX         X",
      "X              X",
      "X              X",
      "X              X",
      "X    S         X",
      "X    XXXXXXXXXXX",
      "XOOOOXXXXXXXXXXX",

    ];
    this.rooms[4][1] = new Level(builder, 4, 1, this.game);
  } else if (name === "World 3") {
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
      "X              X",
      "X              X",
      "X              X",
      "XXXXXXXXXXXXXXXX"
    ];
    this.rooms[8][4] = new Level(builder, 8, 4, this.game);
  }
};
