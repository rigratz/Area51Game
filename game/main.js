var AM = new AssetManager();
// var timesLooped = 0;

function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse, type) {
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
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    //var yindex = 0;
    // if (frame > 7) {
    //     frame = 14 - frame;
    // }
    xindex = frame % 4;
    yindex = Math.floor(frame / 7);

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

function PlayerOne(game, spritesheet) {
  //0 = idle
  //1 = move right
  //2 = move left
  //3 = crouch
  //4 = jump
  this.game = game;
  this.ctx = game.ctx;
  this.x = 200;
  this.y = 500;

  this.moveState = 0;
  this.idleAnimation = new Animation(spritesheet, 38, 40, 0.40, 2, true, false, "idle");
  this.rightAnimation = new Animation(spritesheet, 37, 40, 0.25, 4, true, false, "right");
  this.leftAnimation = new Animation(spritesheet, 38, 40, 0.40, 2, true, false, "left");
  this.crouchAnimation = new Animation(spritesheet, 38, 40, 0.40, 2, true, false, "crouch");
  this.jumpAnimation = new Animation(spritesheet, 28, 26, 0.15, 4, true, false, "jump");

  this.animation = this.idleAnimation;
}

PlayerOne.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

PlayerOne.prototype.update = function() {
    if (this.game.left === true) {
      this.animation = this.rightAnimation;
      this.x -= this.game.clockTick * 200;;
    }
    if (this.game.right === true) {
      this.animation = this.rightAnimation;
      this.x += this.game.clockTick * 200;;
    }
    if (this.game.up === true) {
      this.animation = this.jumpAnimation;
      this.y -= this.game.clockTick * 200;;
    }
    if (this.game.down === true) {
      this.animation = this.jumpAnimation;
      this.y += this.game.clockTick * 200;;
    }
    if (!(this.game.down || this.game.left || this.game.right || this.game.up)) {
      this.animation = this.idleAnimation;
    }
}

function Gizmo(game, spritesheet, type) {
    this.downAnimation = new Animation(spritesheet, 40, 32, 0.15, 4, true, false, "down");
    this.upAnimation = new Animation(spritesheet, 40, 32, 0.15, 4, true, false, "up");
    this.leftAnimation = new Animation(spritesheet, 24, 32, 0.15, 4, true, false, "left");
    this.rightAnimation = new Animation(spritesheet, 24, 32, 0.15, 4, true, false, "right");

    if (type === "down") {
      this.animation = this.downAnimation;
      this.x = 100;
      this.y = 100;
    } else if (type === "up") {
      this.animation = this.upAnimation;
      this.x = 500;
      this.y = 500;
    } else if (type === "left") {
      this.animation = this.leftAnimation;
      this.x = 500;
      this.y = 100;
    } else if (type === "right") {
      this.animation = this.rightAnimation;
      this.x = 100;
      this.y = 500;
    } else if (type === "dizzy") {
      this.animation = this.downAnimation;
      this.x = 300;
      this.y = 300;
      this.startType = "dizzy";
    }
    this.game = game;
    this.ctx = game.ctx;
}

Gizmo.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Gizmo.prototype.update = function() {
    var move = this.animation.type;

    if (this.startType === "dizzy") {
      //break;
    } else if (move === "down") {
      this.y += this.game.clockTick * 100;
    } else if (move === "up") {
      this.y -= this.game.clockTick * 100;
    } else if (move === "left") {
      this.x -= this.game.clockTick * 100;
    } else if (move === "right") {
      this.x += this.game.clockTick * 100;
    }
    if (this.animation.timesLooped >= 50) {
      if (move === "down") {
        this.animation = this.rightAnimation;
      } else if (move === "up") {
        this.animation = this.leftAnimation;
      } else if (move === "left") {
        this.animation = this.downAnimation;
      } else if (move === "right") {
        this.animation = this.upAnimation;
      }
      this.animation.timesLooped = 0;
    }
}

AM.queueDownload("./img/area51main.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new PlayerOne(gameEngine, AM.getAsset("./img/area51main.png")));
    //gameEngine.addEntity(new Gizmo(gameEngine, AM.getAsset("./img/gizmosheet.png"), "dizzy"));

    console.log("All Done!");
});
