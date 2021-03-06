window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

GameEngine.prototype.createHealthBools = function() {
  var bools = [];
  bools["a"] = false;
  bools["c"] = false;
  bools["P"] = false;
  bools["z"] = false;
  bools["Z"] = false;
  bools["v"] = false;
  bools["V"] = false;
  bools["9"] = false;
  bools["8"] = false;
  bools["7"] = false;
  bools["6"] = false;
  bools["5"] = false;
  bools[")"] = false;
  bools["("] = false;
  bools["~"] = false;

  return bools;
};

GameEngine.prototype.setHealthUps = function(ch, i, j) {
  //console.log("setting healths");
  //console.log(this.hasHealthUp);
  if (ch === "healthpacka") {
      if (!this.hasHealthUp["a"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "a"));
  } else if (ch === "healthpackc") {
      if (!this.hasHealthUp["c"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "c"));
  } else if (ch === "healthpackP") {
      if (!this.hasHealthUp["P"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "P"));
  } else if (ch === "healthpackz") {
      if (!this.hasHealthUp["z"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "z"));
  } else if (ch === "healthpackZ") {
      if (!this.hasHealthUp["Z"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "Z"));
  } else if (ch === "healthpackV") {
      if (!this.hasHealthUp["V"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "V"));
  } else if (ch === "healthpackv") {
      if (!this.hasHealthUp["v"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "v"));
  } else if (ch === "healthpack9") {
      if (!this.hasHealthUp["9"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "9"));
  } else if (ch === "healthpack8") {
      if (!this.hasHealthUp["8"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "8"));
  } else if (ch === "healthpack7") {
      if (!this.hasHealthUp["7"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "7"));
  } else if (ch === "healthpack6") {
      if (!this.hasHealthUp["6"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "6"));
  } else if (ch === "healthpack5") {
      if (!this.hasHealthUp["5"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "5"));
  } else if (ch === "healthpack)") {
      if (!this.hasHealthUp[")"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, ")"));
  } else if (ch === "healthpack(") {
      if (!this.hasHealthUp["("]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "("));
  } else if (ch === "healthpack~") {
      if (!this.hasHealthUp["~"]) this.addEntity(new HealthPack(AM.getAsset("./js/img/health_icon.png"), this, i * 50, j * 50, 50, 50, "~"));
  }
};


function GameEngine() {
    //console.log("here");
    this.player = null;

    this.hasSpeed = false;

    this.treeBossDead = false;
    this.snakeBossDead = false;
    this.hasBulletUpgrade = false;
    this.eyeBossDead = false;
    this.alienBossDead = false;

    this.hasShotgun = false;

    this.hasHealthUp = this.createHealthBools();

    this.hasShrink = false;
    this.hasRapidFire = false;

    this.finished = false;

    this.hasDoublejump = false;

    this.bulletDamage = 10;

    this.bulletDamage = 10;

    this.eyeBossHealth = 1000;

    this.currentSong = null;

    this.password = null;

    this.save = false;

    this.entities = [];
    this.platforms = [];
    this.powerups = [];
    this.exits = [];
    this.worlds = [];
    this.playGame = null;
    this.currentWorld = null;
    this.currentPowerUp = " ";
    this.ctx = null;
    this.camera = null;
    this.backgroundImage = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    this.jump = null;
    this.fire = null;
    this.toggle = null;
    this.map = null;

    this.mouse = null;
    this.click = null;
    this.running = false;
    this.lives = 1;
    this.usedHealth = false;
    this.speed = 10;

    this.maxspeed = 250;

    this.maxHealth = 100;
    this.health = 100;

    this.birdDamage = 10; //probably should move this to entitiy.
    this.percent = this.health / this.maxHealth;
    // this.socket = io.connect("http://76.28.150.193:8888");
    //          this.socket.on("connect", function () {
    //     console.log("Socket connected.")
    // });

    // this.socket.on("load", function (data) {
    // var studentName = data.studentname;
    // var stateName = data.statename;
    // console.log(MasterGame.hashealthUp);
    // MasterGame.currentWorld = MasterGame.worlds[data.worldName];
    // MasterGame.hasHealthUp = data.healthup;
    // MasterGame.hasBulletUpgrade = data.bullet;
    // MasterGame.hasShotgun =  data.shotgun;
    // MasterGame.hasRapidFire = data.rapidfire;
    // MasterGame.hasSpeed = data.speed;
    // MasterGame.hasDoublejump = data.doublejump;
    // MasterGame.hasShrink = data.shrink;
    // MasterGame.treeBossDead = data.treeBos;
    // MasterGame.snakeBossDead = data.snakeBoss;
    // MasterGame.eyeBossDead = data.eyeBoss;
    // MasterGame.alienBossDead = data.alienBoss;
    // MasterGame.powerups = data.powerUps;
    // MasterGame.health = data.health;
    // MasterGame.maxHealth = data.maxHealth;
    // console.log(MasterGame.hasHealthUp);
    // console.log(data.healthup);
    // //console.log(data.roomj);
    // //console.log(MasterGame.currentWorld.currentRoom);
    // MasterGame.switchLevel("save", data.roomi, data.roomj);
    //
    //  });


}


GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
        this, 736, 736);
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.generateWorlds = function() {
  this.worlds["Area 51"] = new World("Area 51", this);
  this.worlds["World 1"] = new World("World 1", this);
  this.worlds["World 2"] = new World("World 2", this);
  this.worlds["World 3"] = new World("World 3", this);
  this.worlds["Final Boss"] = new World("Final Boss", this);
}
GameEngine.prototype.switchWorlds = function(comingFrom, goingTo) {
    this.clearLevel();
    if (comingFrom === "Area 51") {
        if (goingTo === "World 1") {
            this.backgroundImage = new Background(AM.getAsset("./js/img/sand2_background.jpg"),
                this, 736, 736); // Replace 736 with actual height and width
            this.currentWorld = this.worlds["World 1"];
            this.currentWorld.currentRoom = this.currentWorld.rooms[5][5];
        } else if (goingTo === "World 2") {
            this.backgroundImage = new Background(AM.getAsset("./js/img/world2_background.png"),
                 this, 2000, 1000); // Replace 736 with actual height and width
            this.currentWorld = this.worlds["World 2"];
            this.currentWorld.currentRoom = this.currentWorld.rooms[2][7];
        } else if (goingTo === "World 3") {
            this.backgroundImage = new Background(AM.getAsset("./js/img/world3_background.jpg"),
                this, 1920, 1080); // Replace 736 with actual height and width
                var x = this.currentWorld.currentRoom.iIndex;
                var y = this.currentWorld.currentRoom.jIndex;
            this.currentWorld = this.worlds["World 3"];
            if (x === 4 && y === 5) {
              this.currentWorld.currentRoom = this.currentWorld.rooms[0][3];
            } else if (x === 2 && y === 0) {
              this.currentWorld.currentRoom = this.currentWorld.rooms[8][4];
            }
            // this.currentWorld.currentRoom = this.currentWorld.rooms[8][4];
        } else if (goingTo === "Final Boss") {
            this.backgroundImage = new Background(AM.getAsset("./js/img/finalboss_background.jpg"),
                 this, 1920, 1200); // Replace 736 with actual height and width
            this.currentWorld = this.worlds["Final Boss"];
            this.currentWorld.currentRoom = this.currentWorld.rooms[4][4];
        }

    } else if (comingFrom === "World 1") {
        this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
            this, 736, 736);
        this.currentWorld = this.worlds["Area 51"];
        this.currentWorld.currentRoom = this.currentWorld.rooms[5][8];

    } else if (comingFrom === "World 2") {
        this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
            this, 736, 736);
        this.currentWorld = this.worlds["Area 51"];
        this.currentWorld.currentRoom = this.currentWorld.rooms[5][1];
    } else if (comingFrom === "World 3") {
        this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
            this, 736, 736);

            var x = this.currentWorld.currentRoom.iIndex;
            var y = this.currentWorld.currentRoom.jIndex;
          this.currentWorld = this.worlds["Area 51"];
        //IF PORTAL ONE OR PORTAL TWO...
        if (x === 0 && y === 3) {
          this.currentWorld.currentRoom = this.currentWorld.rooms[4][5];
        } else if (x === 8 && y === 4) {
          this.currentWorld.currentRoom = this.currentWorld.rooms[2][0];
        }
        // if (this.currentWorld.currentRoom === this.currentWorld.rooms[8][4]) {
        //
        //   this.currentWorld.currentRoom = this.currentWorld.rooms[2][0];
        // } else if (this.currentWorld.currentRoom === this.currentWorld.rooms[0][2]) {
        //
        //   this.currentWorld.currentRoom = this.currentWorld.rooms[4][5];
        // }

    }
  if (this.currentWorld.name === "Area 51" && this.currentSong != AM.getAudioAsset("./js/sound/maintheme.mp3")) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.currentSong = AM.getAudioAsset("./js/sound/maintheme.mp3");
    this.currentSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.currentSong.play();
  } else if (this.currentWorld.name === "World 1" && this.currentSong != AM.getAudioAsset("./js/sound/world1.mp3")) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.currentSong = AM.getAudioAsset("./js/sound/world1.mp3");
    this.currentSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.currentSong.play();
} else if (this.currentWorld.name === "World 2" && this.currentSong != AM.getAudioAsset("./js/sound/.mp3")) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.currentSong = AM.getAudioAsset("./js/sound/world2.mp3");
    this.currentSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.currentSong.play();
  } else if (this.currentWorld.name === "World 3" && this.currentSong != AM.getAudioAsset("./js/sound/world3.mp3")) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.currentSong = AM.getAudioAsset("./js/sound/world3.mp3");
    this.currentSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.currentSong.play();
  } else if (this.currentWorld.name === "Final Boss" && this.currentSong != AM.getAudioAsset("./js/sound/bossmusic.mp3")) {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
    this.currentSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.currentSong.play();
  }
  this.setLevel("south");
}

GameEngine.prototype.clearLevel = function() {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].removeFromWorld = true;
    }
    for (var i = 0; i < this.platforms.length; i++) {
        this.platforms[i].removeFromWorld = true;
    }
    for (var i = 0; i < this.exits.length; i++) {
        this.exits[i].removeFromWorld = true;
    }
}

GameEngine.prototype.setLevel = function(exitedFrom) {
  //console.log(this.hasHealthUp);
  if (this.currentWorld.name === "Area 51") {
    this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
        this, 736, 736);
  } else if (this.currentWorld.name === "World 1") {
    this.backgroundImage = new Background(AM.getAsset("./js/img/sand2_background.jpg"),
        this, 736, 736); // Replace 736 with actual height and width
  } else if (this.currentWorld.name === "World 2") {
    this.backgroundImage = new Background(AM.getAsset("./js/img/world2_background.png"),
         this, 2000, 1000); // Replace 736 with actual height and width
  } else if (this.currentWorld.name === "World 3" && this.currentWorld.currentRoom != this.currentWorld.rooms[0][4]) {
    this.backgroundImage = new Background(AM.getAsset("./js/img/world3_background.jpg"),
        this, 1920, 1080); // Replace 736 with actual height and width
  } else if (this.currentWorld.name === "Final Boss") {
    this.backgroundImage = new Background(AM.getAsset("./js/img/finalboss_background.jpg"),
         this, 1920, 1200); // Replace 736 with actual height and width
  }
    var newIndex = this.entities.length;

    var currLevel = this.currentWorld.currentRoom;
    var saveRoom = false;
    var saveI = -1;
    var saveJ = -1;
    console.log(currLevel.grid);
    console.log(currLevel.grid[0]);
    console.log(currLevel.grid[0].length);
    var levelWidth = currLevel.grid[0].length;
    var levelHeight = currLevel.grid.length;
    this.camera = new Camera(0, 0, 800, 650, currLevel.width * 50, currLevel.height * 50);
    this.playGame = new PlayGame(this, 300, 300);
    this.addEntity(this.playGame);

    var ch;
    for (var i = 0; i < currLevel.grid[0].length; i++) {
        for (var j = 0; j < currLevel.grid.length; j++) {

            ch = currLevel.grid[j][i];

            /************************
             * Player related symbols
             ************************/
            if (ch === "playernorth" && exitedFrom === "south") {
                var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/playerv2.png"));
                this.addEntity(player);
                this.player = player;
                this.camera.follow(player, 100, 100);
            } else if (ch === "playersouth" && exitedFrom === "north") {
                var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/playerv2.png"));
                this.addEntity(player);
                this.player = player;
                this.camera.follow(player, 100, 100);
            } else if (ch === "playereast" && exitedFrom === "west") {
                var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/playerv2.png"));
                this.addEntity(player);
                this.player = player;
                this.camera.follow(player, 100, 100);
            } else if (ch === "playerwest" && exitedFrom === "east") {
                var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/playerv2.png"));
                this.addEntity(player);
                this.player = player;
                this.camera.follow(player, 100, 100);
            }

            /************************
             * Enemy related symbols
             ************************/
            else if (ch === "bird") {
                this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/bird_enemy_spritesheet.png"), 10));
            } else if (ch === "catbird") {
                this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/grumpy_cat.png"), 2));
            } else if (ch === "smallcrazycat") {
                this.addEntity(new CrazyCatEnemy(this, i * 50, (j * 50), AM.getAsset("./js/img/alien.png"), 0.6));
            } else if (ch === "idle_bird") {
                this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/bird_enemy_spritesheet.png"),0));
            } else if (ch === "bigcrazycat") {
                this.addEntity(new CrazyCatEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/alien.png"), 1));
            } else if (ch === "dragon") {
                this.addEntity(new Dragon(this, i * 50, j * 50, AM.getAsset("./js/img/dragon.png")));
            } else if (ch === "snake_enemy") {
                this.addEntity(new SnakeEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/snake.png"), 1));
            } else if (ch === "snake_boss" && !this.snakeBossDead) {
                this.addEntity(new SnakeEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/snake-blue.png"), 2));
            } else if (ch === "tree_boss" && !this.treeBossDead) {
                this.addEntity(new TreeBoss(this, i * 50, j * 50, AM.getAsset("./js/img/boss.png"), 0));
            } else if (ch === "shadow_enemy") {
                this.addEntity(new ShadowEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/shadow_enemy.png"), 2));
            } else if (ch === "shadow_enemy_bound") {
                this.addEntity(new ShadowEnemyBound(this, i * 50, j * 50));
            } else if (ch === "snail") {
                this.addEntity(new SnailEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/snail.png")));
            } else if (ch === "eye_boss" && !this.eyeBossDead) {
                  this.addEntity(new EyeBoss(this, i * 50, j * 50, AM.getAsset("./js/img/eye_boss_weakspot.png")));
            } else if (ch === "eye_boss_weakspot") {
                  this.addEntity(new EyeBossWeakSpot(this, i * 50, j * 50, AM.getAsset("./js/img/eye_boss_weakspot.png")));
            } else if (ch === "shadow_bird") {
                  this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/ShadowBird.png")));
            } else if (ch === "alienboss" && !this.alienBossDead) {
                  this.addEntity(new AlienBoss(this, i * 50, j * 50, AM.getAsset("./js/img/alien_boss.png")));
            }

            /************************
             * Upgrade related symbols
             ************************/
            else if (ch == "speedboost") {
                if (!this.hasSpeed) this.addEntity(new PowerUp(AM.getAsset("./js/img/speed_upgrade_icon.png"), this, i * 50, j * 50, 50, 50, "S"));
            }
            else if (ch == "rapidfire") {
                if (!this.hasRapidFire) this.addEntity(new PowerUp(AM.getAsset("./js/img/rapidFire.png"), this, i * 50, j * 50, 50, 50, "F"));
            }
               else if (ch == "shrink") {
                if (!this.hasShrink) this.addEntity(new PowerUp(AM.getAsset("./js/img/shrink.png"), this, i * 50, j * 50, 50, 50, "T"));
            }
            else if (ch == "bullet_upgrade") {
                if (!this.hasBulletUpgrade) this.addEntity(new PowerUp(AM.getAsset("./js/img/bullet_upgrade_icon.png"), this, i * 50, j * 50, 50, 50, "B"));
            }
            else if (ch == "shotgun") {
                if (!this.hasShotgun) this.addEntity(new PowerUp(AM.getAsset("./js/img/multishot_icon.png"), this, i * 50, j * 50, 50, 50, "R"));
            }
            else if (ch == "doublejump") {
                if (!this.hasDoublejump) this.addEntity(new PowerUp(AM.getAsset("./js/img/double_jump_icon.png"), this, i * 50, j * 50, 50, 50, "J"));
            }

            /************************
             * Level related symbols
             ************************/
            else if (ch === "platform") {
                var mult = 1;
                while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "platform") {
                    currLevel.grid[j+mult][i] = "used_platform";
                    mult += 1;
                }
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "X")));
            } else if (ch === "exit") {
                var exitDir = null;
                if (i === 0) {
                    exitDir = "west";
                } else if (i === currLevel.grid[0].length - 1) {
                    exitDir = "east";
                } else if (j === 0) {
                    exitDir = "north";
                } else if (j === currLevel.grid.length - 1) {
                    exitDir = "south";
                }
                this.exits.push((new Exit(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "exit", exitDir)));
            } else if (ch === "used_platform") {
                currLevel.grid[j][i] = "platform";
            } else if (ch === "portal0") {
                this.exits.push(new Portal(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "portal", "Area 51"));
            } else if (ch === "portal1") {
                this.exits.push(new Portal(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "portal", "World 1"));
            } else if (ch === "portal2") {
                this.exits.push(new Portal(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "portal", "World 2"));
            } else if (ch === "portal3") {
                this.exits.push(new Portal(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "portal", "World 3"));
            } else if (ch === "portal4") {
                this.exits.push(new Portal(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "portal", "Final Boss"));
            } else if (ch === "bosstile") {
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50, "B")));
            } else if (ch === "eye_boss_tile" && !this.eyeBossDead) {
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50, "EB")));
            } else if (ch === "boss1block" && !this.treeBossDead) {
                var mult = 1;
                while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "boss1block") {
                  currLevel.grid[j+mult][i] = "used_boss1block";
                  mult += 1;
                }
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "B1")));
            } else if (ch === "boss2block" && !this.eyeBossDead) {
                var mult = 1;
                while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "boss2block") {
                  currLevel.grid[j+mult][i] = "used_boss2block";
                  mult += 1;
                }
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "B2")));
            } else if (ch === "boss3block" && !this.snakeBossDead) {
                var mult = 1;
                while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "boss3block") {
                  currLevel.grid[j+mult][i] = "used_boss3block";
                  mult += 1;
                }
                this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "B3")));
            } else if (ch === "used_boss1block") {
              currLevel.grid[j][i] = "boss1block";
            } else if (ch === "used_boss2block") {
              currLevel.grid[j][i] = "boss2block";
            } else if (ch === "used_boss3block") {
              currLevel.grid[j][i] = "boss3block";
            }
            else if (ch === "password") {
                  saveRoom = true;
                  saveI = i;
                  saveJ = j

            /************************
             * Health related symbols
             ************************/
            } else if (ch === "healthpacka" || ch === "healthpackc" || ch === "healthpackP"
                      || ch === "healthpackz" || ch === "healthpackZ" || ch === "healthpackv"
                      || ch === "healthpackV" || ch === "healthpack9" || ch === "healthpack8"
                      || ch === "healthpack7" || ch === "healthpack6" || ch === "healthpack5"
                      || ch === "healthpack)" || ch === "healthpack(" || ch === "healthpack~") {
              this.setHealthUps(ch, i, j);
            }
        }
    }
    if (saveRoom) {
        this.platforms.push((new Pedestal(AM.getAsset("./js/img/save_pedestal.png"), this, saveI * 50, saveJ * 50, 300, 200, "Save Pedestal")));
    }

    this.currentWorld.currentRoom.visited = true;
}

GameEngine.prototype.switchLevel = function(exitedFrom, i, j) {
    this.clearLevel();
    if (exitedFrom === "north") {
        this.currentWorld.currentRoom = this.currentWorld.rooms[i-1][j];
    } else if (exitedFrom === "south") {
        this.currentWorld.currentRoom = this.currentWorld.rooms[i+1][j];
    } else if (exitedFrom === "east") {
        this.currentWorld.currentRoom = this.currentWorld.rooms[i][j+1];
    } else if (exitedFrom === "west") {
        this.currentWorld.currentRoom = this.currentWorld.rooms[i][j-1];
    } else if (exitedFrom === "save") {
      this.currentWorld.currentRoom = this.currentWorld.rooms[i][j];
      exitedFrom = "north";
    }
    this.currentWorld.currentRoom.visited = true;
    if (this.currentWorld.name === "World 1") {
      if (this.currentWorld.currentRoom.bossRoom && !this.treeBossDead) {
        this.currentSong.pause();
        this.currentSong.currentTime = 0;
        this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
        this.currentSong.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.currentSong.play();
      } else {
        if (this.currentSong != AM.getAudioAsset("./js/sound/world1.mp3")) {
          this.currentSong.pause();
          this.currentSong.currentTime = 0;
          this.currentSong = AM.getAudioAsset("./js/sound/world1.mp3");
          this.currentSong.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);
          this.currentSong.play();
        }
      }
    } else if (this.currentWorld.name === "World 2") {
      if (this.currentWorld.currentRoom.bossRoom && !this.snakeBossDead) {
        this.currentSong.pause();
        this.currentSong.currentTime = 0;
        this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
        this.currentSong.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.currentSong.play();
      } else {
        if (this.currentSong != AM.getAudioAsset("./js/sound/world2.mp3")) {
          this.currentSong.pause();
          this.currentSong.currentTime = 0;
          this.currentSong = AM.getAudioAsset("./js/sound/world2.mp3");
          this.currentSong.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);
          this.currentSong.play();
        }
      }
    } else if (this.currentWorld.name === "World 3") {
      if (this.currentWorld.currentRoom.bossRoom && !this.eyeBossDead) {
       this.backgroundImage = new Background(AM.getAsset("./js/img/black_background.jpg"),
              this, 685, 391);
        this.currentSong.pause();
        this.currentSong.currentTime = 0;
        this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
        this.currentSong.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.currentSong.play();
      } else {
        this.backgroundImage = new Background(AM.getAsset("./js/img/world3_background.jpg"),
            this, 1920, 1080);
        if (this.currentSong != AM.getAudioAsset("./js/sound/world3.mp3")) {
          this.currentSong.pause();
          this.currentSong.currentTime = 0;
          this.currentSong = AM.getAudioAsset("./js/sound/world3.mp3");
          this.currentSong.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);
          this.currentSong.play();
        }
      }
    } else if (this.currentWorld.name === "Final Boss") {
      if (this.currentSong != AM.getAudioAsset("./js/sound/bossmusic.mp3")) {
        this.currentSong.pause();
        this.currentSong.currentTime = 0;
        this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
        this.currentSong.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.currentSong.play();
      }
    }
    this.setLevel(exitedFrom);
}
GameEngine.prototype.start = function () {
    console.log("starting game");
    this.currentSong = AM.getAudioAsset("./js/sound/maintheme.mp3");
    this.currentSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    this.currentSong.play();
    //console.log("Make player");
    this.player = new PlayerOne(this, 0, 0, AM.getAsset("./js/img/area51main.png"));
    //console.log("made player");
    this.generateWorlds();


     this.currentWorld = this.worlds["Area 51"];
     this.currentWorld.currentRoom = this.currentWorld.rooms[0][6];




      // this.currentWorld = this.worlds["World 2"];
      // this.currentWorld.currentRoom = this.currentWorld.rooms[6][3];

    //  this.currentWorld = this.worlds["World 3"];
    //  this.currentWorld.currentRoom = this.currentWorld.rooms[0][6];

    // this.currentWorld = this.worlds["World 3"];
    // this.currentWorld.currentRoom = this.currentWorld.rooms[0][5];

    // this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
    //     this, 736, 736);

    this.setLevel("east");

    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}
GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }

        return { x: x, y: y };
    }

    var that = this;

    this.ctx.canvas.addEventListener("click", function (e) {
        that.click = getXandY(e);

    }, false);

    this.ctx.canvas.addEventListener("mousemove", function (e) {
        that.mouse = getXandY(e);
    }, false);

    this.ctx.canvas.addEventListener("mouseleave", function (e) {
        that.mouse = null;
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 32) that.toggle = true;
        if (e.keyCode === 37) that.left = true;
        if (e.keyCode === 39) that.right = true;
        if (e.keyCode === 38) that.up = true;
        if (e.keyCode === 40) that.down = true;
        if (e.keyCode === 90) that.jump = true;
        if (e.keyCode === 88) that.fire = true;
        if (e.keyCode === 77) that.map = true;

        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 32) that.toggle = false;
        if (e.keyCode === 88) that.fire = false;
        if (e.keyCode === 90) that.jump = false;
        if (e.keyCode === 37) that.left = false;
        if (e.keyCode === 39) that.right = false;
        if (e.keyCode === 38) that.up = false;
        if (e.keyCode === 40) that.down = false;
        if (e.keyCode === 77) that.map = false;

        e.preventDefault();
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    //console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.addBackgroundImage = function(image) {
    //console.log("Added background");
    this.backgroundImage = image;
}

GameEngine.prototype.draw = function () {
    // if (this.currentWorld.currentRoom === this.currentWorld.rooms[2][4] && this.treeBossDead) {
    //     this.finished = true;
    // }
    //if (this.running === false && this.treeBossDead) {
    //var endscreen = new PlayGame(gameEngine, 300, 300);
    //endscreen.draw(this.ctx);
    //return;
    //}
    if (this.running === false && this.entities[0].is === "PlayGame") {
        this.entities[0].draw(this.ctx);
        return;
    }
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    if (this.camera != null) {
        this.ctx.translate(-this.camera.xView, -this.camera.yView);
    }

    this.backgroundImage.draw(this.ctx);              //Probably should change how we do this

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    for (var i = 0; i < this.platforms.length; i++) {
        this.platforms[i].draw(this.ctx);
    }
    for (var i = 0; i < this.exits.length; i++) {
        this.exits[i].draw(this.ctx);
    }

    if(this.camera != null && this.running) {
        this.ctx.fillStyle = "Red";
        this.ctx.font = "bold 18px sans-serif";
        this.ctx.fillText("HP " + this.health, this.camera.xView + 15, this.camera.yView + 15);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.camera.xView + 20, this.camera.yView + 20, 150, 15);
        if (this.health > 66) {
            this.ctx.fillStyle = "green";
        } else if (this.health > 33 && this.health <= 66) {
            this.ctx.fillStyle = "yellow";
        } else {
            this.ctx.fillStyle = "red";
        }
        this.ctx.fillRect(this.camera.xView + 20, this.camera.yView + 20, 150 * this.percent, 15);
        this.ctx.fillStyle = "Red";
        this.ctx.font = "bold 18px sans-serif";
        this.ctx.fillText("Current Powerup", this.camera.xView + 600, this.camera.yView + 15);

        if (this.currentPowerUp === null || this.currentPowerUp === " ") {
            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "S") {
            var img = AM.getAsset("./js/img/speed_upgrade_icon.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "R") {
            var img = AM.getAsset("./js/img/multishot_icon.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "B") {
            var img = AM.getAsset("./js/img/bullet_upgrade_icon.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "F") {
            var img = AM.getAsset("./js/img/rapidFire.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "J") {
            var img = AM.getAsset("./js/img/double_jump_icon.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
        else if (this.currentPowerUp === "T") {
            var img = AM.getAsset("./js/img/shrink.png");
            this.ctx.drawImage(img,
                0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
    }
    if (this.running && this.currentWorld.name === "Area 51" && this.currentWorld.currentRoom === this.currentWorld.rooms[0][6]) {
        this.ctx.font = "  24pt Impact";
        this.ctx.fillStyle = "red";

        this.ctx.fillText("Use Arrow Keys to move!                                                                      Z = Jump    X = Shoot      Space = Toggle Powers (when available)       M = View Map" , 100, 100);
        //this.ctx.fillText("Z = Jump", 100, 100);
    }
    if (this.alienBossDead) {
        //this.ctx.drawImage(this.bg, 0, 0, 800, 650, 0, 0, 800, 650);
        this.ctx.font = "  24pt Impact";
        this.ctx.fillStyle = "white";

        this.ctx.fillText("Congratulations! You have saved the world or something!", this.camera.xView + 35, this.camera.yView + 100);
        this.ctx.fillText("But I think you can play through faster than that...", this.camera.xView + 105, this.camera.yView + 300);
        this.ctx.fillText("Refresh your browser to start over.", this.camera.xView + 170, this.camera.yView + 400);
    }
    if (this.map) {
      this.ctx.fillStyle = "green";
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {

          if (this.currentWorld.rooms[j][i] === this.currentWorld.currentRoom) {
            this.ctx.fillStyle = "yellow";
          } else if (this.currentWorld.rooms[j][i].visited === true) {
             this.ctx.fillStyle = "blue";
           } else if (this.currentWorld.rooms[j][i].visited === false) {
             this.ctx.fillStyle = "gray";
           } else if (!(this.currentWorld.rooms[j][i] instanceof Level)) {
             this.ctx.fillStyle = "black";
          }

          this.ctx.fillRect(this.camera.xView +275 + (i * 25) ,this.camera.yView + 200 + (j * 25) , 25, 25);
          if (this.currentWorld.rooms[j][i].portalRoom) {
            this.ctx.drawImage(AM.getAsset("./js/img/textures.png"),
                0, 200,  // source from sheet
                50, 50,
                this.camera.xView +275 + (i * 25), this.camera.yView + 200 + (j * 25),
                25,
                25);
          } else if (this.currentWorld.rooms[j][i].bossRoom) {
            this.ctx.drawImage(AM.getAsset("./js/img/textures.png"),
                0, 300,  // source from sheet
                50, 50,
                this.camera.xView +275 + (i * 25), this.camera.yView + 200 + (j * 25),
                25,
                25);
          } else if (this.currentWorld.rooms[j][i].saveRoom) {
            this.ctx.drawImage(AM.getAsset("./js/img/textures.png"),
                0, 600,  // source from sheet
                50, 50,
                this.camera.xView +275 + (i * 25), this.camera.yView + 200 + (j * 25),
                25,
                25);
          }
        }
    }
  }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {


    if (this.eyeBossDead) {
        for (var i = 0; i < this.platforms.length; i++) {
            if(this.platforms[i].platType === "EB") {
                this.platforms.splice(i, 1);
            }
        }
    }
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
    for (var i = this.platforms.length - 1; i >= 0; --i) {
        if (this.platforms[i].removeFromWorld) {
            this.platforms.splice(i, 1);
        }
    }
    for (var i = this.exits.length - 1; i >= 0; --i) {
        if (this.exits[i].removeFromWorld) {
            this.exits.splice(i, 1);
        }
    }


}

GameEngine.prototype.reset = function () {
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].reset();
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.click = null;
}



function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}
