
var AM = new AssetManager();

function BoundingRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
}


AM.queueDownload("./img/area51main.png");
AM.queueDownload("./img/bird_enemy_spritesheet.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();


    var levelPlan = [
    "X B            X           ",
    "X              X           ",
    "X              X           ",
    "X              X           ",
    "X         XXXXXX           ",
    "X                         X",
    "X                         X",
    "XXXXXX                    X",
    "X              XXXXXXXXXXXX",
    "X        XXXXXXX           ",
    "X              X           ",
    "X @   XXXXXXXXXX           ",
    "XXXXXXXXXXXXXXXX           "
    ];
    var currLevel = new Level(levelPlan, gameEngine);
    /*
   This will probably be different once we can read from a text file but im not sure how.
    */
    // var platforms = [];
    // var pf = new Platform(gameEngine, 0, 650, 800, 50);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine, 0, 0, 50, 800);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine, 750, 0, 50, 800);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine,  0, 0, 800, 50);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine, 400, 400, 500, 50);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine,  500, 550, 500, 50);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    // pf = new Platform(gameEngine,  500, 300, 500, 50);
    // gameEngine.addEntity(pf);
    // platforms.push(pf);
    //
    // gameEngine.platforms = platforms;
    // gameEngine.addEntity(new PlayerOne(gameEngine, AM.getAsset("./img/area51main.png")));
    // gameEngine.addEntity(new BirdEnemy(gameEngine, AM.getAsset("./img/bird_enemy_spritesheet.png")));

    var ch;
    for (var i = 0; i < currLevel.grid[0].length; i++) {
      for (var j = 0; j < currLevel.grid.length; j++) {
        ch = currLevel.grid[j][i];
        if (ch === "player") {
          gameEngine.addEntity(new PlayerOne(gameEngine, i * 50, j * 50 - 125, AM.getAsset("./img/area51main.png")));
        } else if (ch === "bird") {
          gameEngine.addEntity(new BirdEnemy(gameEngine, i * 50, j * 50, AM.getAsset("./img/bird_enemy_spritesheet.png")));
        } else if (ch === "platform") {
          gameEngine.platforms.push((new Platform(gameEngine, i * 50, j * 50, 50, 50)));
        }
      }
    }

    console.log("All Done!");
});
