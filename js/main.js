var AM = new AssetManager();
var MasterGame = null;

function BoundingRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
    //console.log(this);
}

AM.queueDownload("./js/img/mainscreen.png");
AM.queueDownload("./js/img/area51main.png");
AM.queueDownload("./js/img/playerv2.png");
AM.queueDownload("./js/img/bird_enemy_spritesheet.png");
AM.queueDownload("./js/img/ShadowBird.png");
AM.queueDownload("./js/img/shadow_enemy.png");
AM.queueDownload("./js/img/eye_boss_weakspot.png");
AM.queueDownload("./js/img/cement_background.jpg");
AM.queueDownload("./js/img/marble_background.jpg");
AM.queueDownload("./js/img/sand_background.jpg");
AM.queueDownload("./js/img/sand2_background.jpg");
AM.queueDownload("./js/img/world2_background.png");
AM.queueDownload("./js/img/world3_background.jpg");
AM.queueDownload("./js/img/finalboss_background.jpg");
AM.queueDownload("./js/img/black_background.jpg");
AM.queueDownload("./js/img/textures.png");
AM.queueDownload("./js/img/dragon.png");
AM.queueDownload("./js/img/grumpy_cat.png");
AM.queueDownload("./js/img/save_pedestal.png");
AM.queueDownload("./js/img/speed_upgrade_icon.png");
AM.queueDownload("./js/img/double_jump_icon.png");
AM.queueDownload("./js/img/bullet_upgrade_icon.png");
AM.queueDownload("./js/img/multishot_icon.png");
AM.queueDownload("./js/img/bullet.png");
AM.queueDownload("./js/img/bullet-left.png");
AM.queueDownload("./js/img/bullet-up.png");
AM.queueDownload("./js/img/health_icon.png");
AM.queueDownload("./js/img/health.png");
AM.queueDownload("./js/img/snake-blue.png");
AM.queueDownload("./js/img/snake.png");
AM.queueDownload("./js/img/snail.png");
AM.queueDownload("./js/img/shrink.png");
AM.queueDownload("./js/img/fireball.png");
AM.queueDownload("./js/img/rapidFire.png");



AM.queueDownload("./js/img/alien.png");
AM.queueDownload("./js/img/alien_boss.png");
AM.queueDownload("./js/img/boss.png");


AM.queueAudioDownload("./js/sound/laser.wav");
AM.queueAudioDownload("./js/sound/jump.wav");
AM.queueAudioDownload("./js/sound/damage.wav");
AM.queueAudioDownload("./js/sound/monster_scream.wav");
AM.queueAudioDownload("./js/sound/enemy_damage_sound.wav");
AM.queueAudioDownload("./js/sound/maintheme.mp3");
AM.queueAudioDownload("./js/sound/bossmusic.mp3");
AM.queueAudioDownload("./js/sound/world1.mp3");
AM.queueAudioDownload("./js/sound/world2.mp3");
AM.queueAudioDownload("./js/sound/world3.mp3");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    MasterGame = new GameEngine();
    console.log("created");
    MasterGame.init(ctx);

    // gameEngine.addEntity(new PlayGame(gameEngine, 300, 300));

    MasterGame.start();

    console.log("All Done!");
    console.log("Controls:");
    console.log("Move Left: Left Arrow");
    console.log("Move Right: Right Arrow");
    console.log("Aim Up: Up Arrow");
    console.log("Crouch: Down Arrow");
    console.log("Jump: Z");
    console.log("Shoot: X");
    console.log("Toggle Powerups: Space");
    console.log("View Map: M (Hold)");


 });
