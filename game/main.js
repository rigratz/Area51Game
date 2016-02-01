var AM = new AssetManager();
// var timesLooped = 0;

function Animation(entityType, spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse, type) {
    this.entityType = entityType;
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.type = type;
    this.timesLooped = 0;

    this.time = 0;
    console.log(this.spriteSheet);
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    //var yindex = 0;
    // if (frame > 7) {
    //     frame = 14 - frame;
    // }
    if (this.entityType === "player") {
        xindex = frame % 4;
        yindex = Math.floor(frame / 7);
    }
    if (this.entityType === "bird_enemy") {
        xindex = frame % 8;
        yindex = 0;
    }


    //console.log(frame + " " + xindex + " " + yindex);

    // ctx.drawImage(this.spriteSheet,
    //              xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
    //              this.frameWidth, this.frameHeight,
    //              x, y,
    //              this.frameWidth *3,
    //              this.frameHeight*3);
    var xframe = 0;
    var yframe = 0;
    if (this.type === "idle") {
      xframe = 3 + (xindex * this.frameWidth);
      yframe = 2;
    } else if (this.type === "right") {
      xframe = 3 + (xindex * this.frameWidth);
      yframe = 81;
    } else if (this.type === "jump") {
      xframe = 1 + (xindex * this.frameWidth);
      yframe = 45;
    }
    ctx.drawImage(this.spriteSheet,
                 xframe, yframe,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth *3,
                 this.frameHeight*3);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

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

function Platform(game, x, y, w, h) {
  this.ctx = game.ctx;
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.debug = true;
  this.boundingRect = new BoundingRect(x, y, w, h);
}
Platform.prototype.update = function() {
}
Platform.prototype.draw = function () {
  this.ctx.strokeStyle = "yellow";
  this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "red";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);

}

function PlayerOne(game, spritesheet) {
  this.game = game;
  this.ctx = game.ctx;
  this.x = 200;
  this.y = 300;
  this.xvel = 0;
  this.yvel = 0;
  this.boundingRect = new BoundingRect(200, 500, 90, 124);
  this.debug = true;

  this.falling = false;
  this.fallTime = 0;

  this.jumping = false;
  this.jumpHeight = 300;
  this.jumpTime = 0;
  this.totalJump = 2;

  this.moveState = 0;
  this.idleAnimation = new Animation("player", spritesheet, 38, 42, 0.40, 2, true, false, "idle");
  this.rightAnimation = new Animation("player", spritesheet, 37, 42, 0.25, 4, true, false, "right");
  this.leftAnimation = new Animation("player", spritesheet, 38, 42, 0.40, 2, true, false, "left");
  this.crouchAnimation = new Animation("player", spritesheet, 38, 40, 0.40, 2, true, false, "crouch");
  this.jumpAnimation = new Animation("player", spritesheet, 28, 26, 0.15, 4, true, false, "jump");

  this.animation = this.idleAnimation;
}

PlayerOne.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;

    if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
}

PlayerOne.prototype.update = function() {
    if (this.game.left === true) {
      this.animation = this.rightAnimation;
      this.xvel = -200;
    }
    if (this.game.right === true) {
      this.animation = this.rightAnimation;
      this.xvel = 200;
    }
    if (this.game.up === true) {
      this.animation = this.jumpAnimation;
      if (!this.jumping && !this.falling) {
        this.jumping = true;
        this.yvel = -600;
      }
    }
    if (this.game.down === true) {
      this.animation = this.jumpAnimation;
      if (!this.jumping && !this.falling) {
        this.jumping = true;
        this.yvel = -600;
      }
    }
    if (!(this.game.down || this.game.left || this.game.right || this.game.up)) {
      this.animation = this.idleAnimation;
      this.xvel = 0;
    }
    this.boundingRect = new BoundingRect(this.x, this.y, 90, 124);
    if (this.game.up || this.game.down) {
      this.boundingRect.height = 80;
      this.boundingRect.bottom = this.boundingRect.y + 80;
    }
    if (this.jumping) {
      this.boundingRect = new BoundingRect(this.x, this.y, 90, 80);
      this.animation = this.jumpAnimation;
      this.jumpTime += this.game.clockTick;
      this.yvel += this.jumpTime * 60;
      if (this.yvel > 700) this.yvel = 700;

      for (var i = 0; i < this.game.platforms.length; i++) {
        var plat = this.game.platforms[i];

        if (this.collide(plat)) {
          if (this.collideBottom(plat)) {
            this.jumping = false;
            this.yvel = 0;
            this.jumpTime = 0;
            this.y = plat.boundingRect.top - 124;
          } else if (this.collideLeft(plat)) {
            this.xvel = 0;
            this.x += 1;
          } else if (this.collideRight(plat)) {
            this.xvel = 0;
            this.x -= 1;
          } else if (this.collideTop(plat)) {
            console.log("TOP");
            this.yvel = 0;
            this.y += 1;
          }
        }
      }
    } else if (this.falling) {
        //console.log("FALLING");
        this.animation = this.jumpAnimation;
        this.fallTime += this.game.clockTick;
        this.yvel += this.fallTime * 60;
        if (this.yvel > 700) this.yvel = 700;
        for (var i = 0; i < this.game.platforms.length; i++) {
          var plat = this.game.platforms[i];
          if (this.collide(plat)) {
            if (this.collideBottom(plat)) {
              this.falling = false;
              this.yvel = 0;
              this.fallTime = 0;
              this.y = plat.boundingRect.top - 124;
              //console.log("BOO");
            } else if (this.collideLeft(plat)) {
              this.xvel = 0;
              this.x += 1;
            } else if (this.collideRight(plat)) {
              this.xvel = 0;
              this.x -= 1;
            } else if (this.collideTop(plat)) {
              console.log("TOP");
              this.yvel = 0;
              this.y += 1;
            }
          }
        }
    } else {
      //this.falling = true;
      var land = false;
      var leftWall = false;
      var rightWall = false;
      for (var i = 0; i < this.game.platforms.length; i++) {
        var plat = this.game.platforms[i];

        // if (!this.collide(plat)) {
        //   this.falling = true;
        //   this.yvel = 100;
        // } else {
        //
        //   this.falling = false;
        //   this.yvel = 0;
        //   break;
        // }

        if (this.collide(plat)) {
          if (this.collideBottom(plat)) {
            land = true;
          } else if (this.collideLeft(plat)) {
            //leftWall = true;
            this.xvel = 0;
            this.x += 1;
          } else if (this.collideRight(plat)) {
            //rightWall = true;
            this.xvel = 0;
            this.x -= 1;
          }
        }

      }
      if (land) {
        this.falling = false;
        this.yvel = 0;
      } else {
        this.falling = true;
        this.yvel = 100;
      }
      if (leftWall) {
        this.xvel = 0;
        this.x += 1;
      }
      if (rightWall) {
        this.xvel = 0;
        this.x -= 1;
      }
    }
    /*
    * This loop checks if the player has touched any other entities except for himself.
    * If so, the bounding box disappears to represent the player taking damage/dying.
    * We will add this later.
    */
    for (var i = 0; i < this.game.entities.length; i++) {
        var enemy = this.game.entities[i];
        if (this != enemy && this.collide(enemy)) {
            this.debug = false;
        }
    }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;

}
PlayerOne.prototype.collide = function(other) {
  return (this.boundingRect.bottom >= other.boundingRect.top) &&
  (this.boundingRect.left <= other.boundingRect.right) &&
  (this.boundingRect.right >= other.boundingRect.left) &&
  (this.boundingRect.top <= other.boundingRect.bottom);
}
PlayerOne.prototype.collideTop = function(other) {

  return this.boundingRect.top <= other.boundingRect.bottom &&
          this.boundingRect.bottom >= other.boundingRect.bottom;
}
PlayerOne.prototype.collideLeft = function(other) {


  return this.boundingRect.left <= other.boundingRect.right &&
              this.boundingRect.right >= other.boundingRect.right;
}
PlayerOne.prototype.collideRight = function(other) {


  return this.boundingRect.right >= other.boundingRect.left &&
              this.boundingRect.left <= other.boundingRect.left;
}
PlayerOne.prototype.collideBottom = function(other) {


  return this.boundingRect.bottom >= other.boundingRect.top &&
          this.boundingRect.top <= other.boundingRect.top;
}

function BirdEnemy(game, spritesheet) {
  this.game = game;
  this.ctx = game.ctx;
  this.x =80;
  this.y = 50;
  this.xvel = 0;
  this.yvel = 0;
  this.boundingRect = new BoundingRect(200, 500, 90, 124);
  this.debug = true;
  this.idleAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.14, 8, true, false, "idle");
  // this.rightAnimation = new Animation("bird_enemy", spritesheet, 95, 200, 0.14, 8, true, false, "right");
  // this.leftAnimation = new Animation("bird_enemy", spritesheet, 95, 300, 0.14, 8, true, false, "left");
  this.animation = this.idleAnimation;
}
BirdEnemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
}
BirdEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x + 40, this.y + 50, 2 * 95, 2 * 100);
    //this.x += this.xvel * this.game.clockTick;
    //this.y += this.yvel * this.game.clockTick;
}


AM.queueDownload("./img/area51main.png");
AM.queueDownload("./img/bird_enemy_spritesheet.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.platforms.push((new Platform(gameEngine, 0, 0, 50, 800)));
    gameEngine.platforms.push((new Platform(gameEngine, 0, 650, 800, 50)));
    gameEngine.platforms.push((new Platform(gameEngine, 750, 0, 50, 800)));
    gameEngine.platforms.push((new Platform(gameEngine, 0, 0, 800, 50)));
    gameEngine.platforms.push((new Platform(gameEngine, 400, 400, 500, 50)));
    gameEngine.platforms.push((new Platform(gameEngine, 500, 550, 500, 50)));
    gameEngine.platforms.push((new Platform(gameEngine, 500, 350, 500, 50)));
    gameEngine.addEntity(new PlayerOne(gameEngine, AM.getAsset("./img/area51main.png")));
    gameEngine.addEntity(new BirdEnemy(gameEngine, AM.getAsset("./img/bird_enemy_spritesheet.png")));

    console.log("All Done!");
});
