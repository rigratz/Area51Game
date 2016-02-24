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

AM.queueDownload("./js/img/mainscreen.png");
AM.queueDownload("./js/img/area51main.png");
AM.queueDownload("./js/img/bird_enemy_spritesheet.png");
AM.queueDownload("./js/img/cement_background.jpg");
AM.queueDownload("./js/img/marble_background.jpg");
AM.queueDownload("./js/img/sand_background.jpg");
AM.queueDownload("./js/img/sand2_background.jpg");
AM.queueDownload("./js/img/textures.png");
AM.queueDownload("./js/img/textures2.png");
AM.queueDownload("./js/img/dragon.png");
AM.queueDownload("./js/img/grumpy_cat.png");
AM.queueDownload("./js/img/speed_upgrade_icon.png");
AM.queueDownload("./js/img/bullet.png");
AM.queueDownload("./js/img/alien.png");



AM.queueAudioDownload("./js/sound/laser.wav");
AM.queueAudioDownload("./js/sound/jump.wav");
AM.queueAudioDownload("./js/sound/damage.wav");
AM.queueAudioDownload("./js/sound/maintheme.mp3");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

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
    console.log("Toggle Powerups: Space");
    //console.log(AM.getAsset("./js/img/alien.png"));
});
