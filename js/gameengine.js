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

function GameEngine() {
  console.log("here");
  this.player = null;

  this.hasSpeed = false;

  this.treeBossDead = false;

  this.hasBulletUpgrade = false;



  this.bulletDamage = 10;



  this.currentSong = null;
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


    this.mouse = null;
    this.click = null;
    this.running = false;
    this.lives = 3;


    this.speed = 10;
    this.maxspeed = 250;

    // this.deadBirds = 0;
    // this.shotsFired = 0;
    this.maxHealth = 100;
    this.health = 100;

    this.birdDamage = 10; //probably should move this to entitiy.
    this.percent = this.health / this.maxHealth;

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
  //  this.playGame = new PlayGame(this, 300, 300);
 //   this.addEntity(this.playGame);
}

GameEngine.prototype.generateWorlds = function() {
  this.worlds["Area 51"] = new World("Area 51", this);
  this.worlds["World 1"] = new World("World 1", this);
}
GameEngine.prototype.switchWorlds = function(comingFrom, goingTo) {
  console.log("PORTAL");
  console.log(comingFrom);
  console.log(goingTo);
  this.clearLevel();
  if (comingFrom === "Area 51") {
    if (goingTo === "World 1") {
      console.log("PORTAL TO 1");
      this.backgroundImage = new Background(AM.getAsset("./js/img/sand2_background.jpg"),
           this, 736, 736); // Replace 736 with actual height and width
      this.currentWorld = this.worlds["World 1"];
      this.currentWorld.currentRoom = this.currentWorld.rooms[5][5];
      //this.setLevel();
    }

  } else if (comingFrom === "World 1") {
    this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
         this, 736, 736);
    this.currentWorld = this.worlds["Area 51"];
    this.currentWorld.currentRoom = this.currentWorld.rooms[5][8];

  }
  this.setLevel("south");
}

GameEngine.prototype.clearLevel = function() {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].removeFromWorld = true;
    //console.log("this should do something");
    //console.log(this.entities[i].removeFromWorld);

  }
  for (var i = 0; i < this.platforms.length; i++) {
    this.platforms[i].removeFromWorld = true;
  }
  for (var i = 0; i < this.exits.length; i++) {
    this.exits[i].removeFromWorld = true;
  }
}

GameEngine.prototype.setLevel = function(exitedFrom) {
  var newIndex = this.entities.length;

  console.log(this.currentWorld);
  console.log(exitedFrom);
  var currLevel = this.currentWorld.currentRoom;

  var levelWidth = currLevel.grid[0].length;
  var levelHeight = currLevel.grid.length;
  this.camera = new Camera(0, 0, 800, 650, currLevel.width * 50, currLevel.height * 50);
  this.playGame = new PlayGame(this, 300, 300);
  this.addEntity(this.playGame);

  var ch;
  for (var i = 0; i < currLevel.grid[0].length; i++) {
    for (var j = 0; j < currLevel.grid.length; j++) {
      ch = currLevel.grid[j][i];
      if (ch === "playernorth" && exitedFrom === "south") {
        console.log("starting north");
        var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/area51main.png"));

        this.addEntity(player);
        this.player = player;
        this.camera.follow(player, 100, 100);
      } else if (ch === "playersouth" && exitedFrom === "north") {
        console.log("starting south");
        var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/area51main.png"));

        this.addEntity(player);
        this.player = player;
        this.camera.follow(player, 100, 100);
      } else if (ch === "playereast" && exitedFrom === "west") {
        console.log("starting east");
        var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/area51main.png"));

        this.addEntity(player);
        this.player = player;
        this.camera.follow(player, 100, 100);
      } else if (ch === "playerwest" && exitedFrom === "east") {
        console.log("starting west");
        var player = new PlayerOne(this, i * 50, j * 50 - 52, AM.getAsset("./js/img/area51main.png"));

        this.addEntity(player);
        this.player = player;
        this.camera.follow(player, 100, 100);
      } else if (ch === "bird") {
        this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/bird_enemy_spritesheet.png"), 10));
      } else if (ch === "catbird") {
          //this.addEntity(new CrazyCatEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/alien.png")));
          this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/grumpy_cat.png"), 2));
      } else if (ch === "smallcrazycat") {
        this.addEntity(new CrazyCatEnemy(this, i * 50, (j * 50), AM.getAsset("./js/img/alien.png"), 0.6));
          //console.log("cat added!");
          //console.log(AM.getAsset("./js/img/alien.png"));
      } else if (ch === "idle_bird") {
          this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/bird_enemy_spritesheet.png"),0));
      } else if (ch === "bigcrazycat") {
          this.addEntity(new CrazyCatEnemy(this, i * 50, j * 50, AM.getAsset("./js/img/alien.png"), 1));
          //console.log("cat added!");
          //console.log(AM.getAsset("./js/img/alien.png"));
      }else if (ch === "platform") {
        var mult = 1;
        while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "platform") {
          currLevel.grid[j+mult][i] = "used_platform";
          mult += 1;
        }

        this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "X")));
      // } else if (ch === "platformtop") {
      //   this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i*50, j*50, 50, 50, "T")));
      } else if (ch === "dragon") {
          this.addEntity(new Dragon(this, i * 50, j * 50, AM.getAsset("./js/img/dragon.png")));
      } else if (ch == "speedboost") {
          if (!this.hasSpeed) this.addEntity(new PowerUp(AM.getAsset("./js/img/speed_upgrade_icon.png"), this, i * 50, j * 50, 50, 50, "S"));
      }
      else if (ch == "bullet_upgrade") {
           if (!this.hasBulletUpgrade) this.addEntity(new PowerUp(AM.getAsset("./js/img/bullet_upgrade_icon.png"), this, i * 50, j * 50, 50, 50, "B"));
      }
      else if (ch === "healthpack") {
        this.addEntity(new HealthPack(this, i *50, j *50));
      }
      else if (ch === "exit") {
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
      } else if (ch === "bosstile") {
        this.platforms.push((new Platform(AM.getAsset("./js/img/textures.png"), this, i * 50, j * 50, 50, 50, "B")));
      }
      else if (ch === "tree_boss" && !this.treeBossDead) {
          this.addEntity(new TreeBoss(this, i * 50, j * 50, AM.getAsset("./js/img/boss.png"), 0));
      }
    }
  }
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
  }

  if (this.currentWorld.name === "World 1" && this.currentWorld.currentRoom === this.currentWorld.rooms[2][4]) {
    if (!this.treeBossDead) {
      this.currentSong.pause();
      this.currentSong.currentTime = 0;
      this.currentSong = AM.getAudioAsset("./js/sound/bossmusic.mp3");
      this.currentSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      this.currentSong.play();
    } else if (this.treeBossDead && this.currentSong != AM.getAudioAsset("./js/sound/maintheme.mp3")){
      this.currentSong.pause();
      this.currentSong.currentTime = 0;
      this.currentSong = AM.getAudioAsset("./js/sound/maintheme.mp3");
      this.currentSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      this.currentSong.play();
    }

  }
  // if (this.currentWorld.name === "Area 51") {
  //     this.currentWorld.name = "World 1";
  //     this.backgroundImage = new Background(AM.getAsset("./js/img/sand2_background.jpg"),
  //     this, 736, 736); // Replace 736 with actual height and width
  // } else if (this.currentWorld.name === "World 1") {
  //   this.currentWorld.name = "Area 51";
  //   this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
  //   this, 736, 736);
  // }
  //console.log("switching");
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
    this.player = new PlayerOne(this, 0, 0, AM.getAsset("./js/img/area51main.png"));
    this.generateWorlds();
    this.currentWorld = this.worlds["Area 51"];
    this.currentWorld.currentRoom = this.currentWorld.rooms[0][6];
    //this.currentWorld = this.worlds["World 1"];
    //this.currentWorld.currentRoom = this.currentWorld.rooms[2][4];
    this.backgroundImage = new Background(AM.getAsset("./js/img/cement_background.jpg"),
            this, 736, 736);
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
        this.ctx.fillText("HP " + this.health + "    Lives " + this.lives, this.camera.xView + 15, this.camera.yView + 15);
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
// <<<<<<< HEAD
//         this.ctx.fillText("Lives " + this.lives, this.camera.xView + 720, this.camera.yView + 15);
//         this.ctx.fillText("Current Powerup", this.camera.xView + 500, this.camera.yView + 15);
//         //console.log(this.currentPowerUp);
//         //console.log(this.powerups.length);
// =======
       // this.ctx.fillText("Lives " + this.lives, this.camera.xView + 720, this.camera.yView + 15);
        this.ctx.fillText("Current Powerup", this.camera.xView + 600, this.camera.yView + 15);
       // console.log(this.currentPowerUp);
       // console.log(this.powerups.length);
//>>>>>>> 55354a41f0791bab100849861bf47409812967d2
        if (this.currentPowerUp === null || this.currentPowerUp === " ") {
            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(this.camera.xView + 750, this.camera.yView + 5, 50, 50);
        }
         else if (this.currentPowerUp === "S") {
           var img = AM.getAsset("./js/img/speed_upgrade_icon.png");
           this.ctx.drawImage(img,
           0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
       }
       else if (this.currentPowerUp === "B") {
         var img = AM.getAsset("./js/img/bullet_upgrade_icon.png");
         this.ctx.drawImage(img,
         0, 0,  50, 50, this.camera.xView + 750, this.camera.yView + 5, 50, 50);
     }
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
  //console.log(this.entities);
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

 //   console.log(this.entities.length);
    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
            //console.log("be gone!");
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
