// var levelPlan = [
// "X B            X",
// "X              X",
// "X         XXXXXX",
// "X              X",
// "X              X",
// "XXXXXX         X",
// "X              X",
// "X        XXXXXXX",
// "X              X",
// "X @   XXXXXXXXXX",
// "XXXXXXXXXXXXXXXX"
// ];

var levelPlan = [
// "X B            X            XXXXXXX         X",
// "X              X                            X",
// "X              X                            X",
// "X              X                            X",
// "X         XXXXXX                            X",
// "X                         XXXXXXXXXXX       X",
// "X                         X                 X",
// "XXXXXX                    X                 X",
// "X              XXXXXXXXXXXXXXXXX       XXXXXX",
// "X        XXXXXXX                            X",
// "X              X                            X",
// "X @   XXXXXXXXXX                            X",
// "XXXXXXXXXXXXXXXX     XXXXXXXXXXXXXXXXXXXXXXXX",
// "X              X                            X",
// "X              X                            X",
// "X              X                            X",
// "X              X                            X",
// "X              X                            X",
// "X                                           X",
// "X                                           X",
// "X                                           X",
// "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// ];
"XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"X             B    X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"X                  X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"X @                X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"XTTTTTTTTTTTTT     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X B                XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X     B            XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X                  XXXXXXXXXXXXXXXXXXXXXXXXX",
"XXXXXXXXXXXXXX     X                                         XX",
"XXXXXXXXXXXXXX     X                                         XX",
"XXXXXXXXXXXXXX     X                                         XX",
"XXXXXXXXXXXXXX     X                                         XX",
"XXXXXXXXXXXXXX     X       T     TTTTTTTTTTTTTTTTTTTTT       XX",
"X                          X     XXXXXXXXXXXXXXXXXXXXX       XX",
"X B           B            X     XXXXXXXXXXXXXXXXXXXXX       XX",
"X                          XTTTTTXXXXXXXXXXXXXXXXXXXXX       XX",
"X                    TTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"X                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"X                TTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"X                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX       XX",
"XX                                                           XX",
"XX              B                                            XX",
"XX                                                           XX",
"XX B         TT           TT B          TT    B              XX",
"XX           XX           XX            XX                   XX",
"XX           XX           XX            XX                   XX",
"XX           XX           XX            XX                   XX",
"XXTTTTTTTTTTTXXTTTTTTTTTTTXXTTTTTTTTTTTTXXTTTTTTTTTTTTTTTTTTTXX",
"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
];



function Level(plan, gameEngine) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  //this.entities = [];

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      //var Actor = actorChars[ch];
      if (ch === "@")
        //this.entities.push(new PlayerOne(gameEngine, AM.getAsset("./img/area51main.png")));
        fieldType = "player";
      else if (ch === "X")
        fieldType = "platform";
      else if (ch === "T")
        fieldType = "platformtop";
      else if (ch === "B")
        fieldType = "bird";
        //this.entities.push(new BirdEnemy(gameEngine, AM.getAsset("./img/bird_enemy_spritesheet.png")));
      else if (ch === "D")
        fieldType = "dragon";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }
}
