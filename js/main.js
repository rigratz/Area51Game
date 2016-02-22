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

AM.queueDownload("./js/img/area51main.png");
AM.queueDownload("./js/img/bird_enemy_spritesheet.png");
AM.queueDownload("./js/img/cement_background.jpg");
AM.queueDownload("./js/img/textures.png");
AM.queueDownload("./js/img/dragon.png");
AM.queueDownload("./js/img/grumpy_cat.png");
AM.queueDownload("./js/img/speed_upgrade_icon.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    /*This is probably not the best way to do this*/
    gameEngine.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
        gameEngine, 736, 736);
    /**********************************************/
    gameEngine.init(ctx);
    gameEngine.addEntity(new PlayGame(gameEngine, 300, 300));
    gameEngine.start();

    console.log("All Done!");
    console.log("Controls:");
    console.log("Move Left: Left Arrow");
    console.log("Move Right: Right Arrow");
    console.log("Aim Up: Up Arrow");
    console.log("Crouch: Down Arrow");
    console.log("Jump: Z");
    console.log("Shoot: X");
});
