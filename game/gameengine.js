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
    this.entities = [];
    this.platforms = []; // platforms should be an entity
    this.exits = [];
    this.worlds = [];
    this.currentWorld = null;
    this.ctx = null;
    this.camera = null;
    this.backgroundImage = null;    //This is kinda hacky.
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    this.jump = null;
    this.fire = null;

    this.mouse = null;
    this.click = null;
    this.running = false;
    this.lives = 3;
    this.deadBirds = 0;
    this.shotsFired = 0;
    this.maxHealth = 100;
    this.health = 100;
    this.percent = this.health / this.maxHealth;

}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.generateWorlds = function() {
  this.worlds["Area 51"] = new World("Area 51", this);
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
  //console.log(this.currentWorld.currentRoom);
}
GameEngine.prototype.setLevel = function() {
  //console.log("setting Level");
  // this.entities = [];
  // this.platforms = [];
  // this.exits = [];
  // console.log(this.platforms.length);
  // //this.clearLevel();
  // console.log(this.platforms.length);
  var currLevel = this.currentWorld.currentRoom;
  // console.log(currLevel);
  // console.log(this.currentWorld);
  var levelWidth = currLevel.grid[0].length;
  var levelHeight = currLevel.grid.length;
  this.camera = new Camera(0, 0, 800, 650, currLevel.width * 50, currLevel.height * 50);

  var ch;
  for (var i = 0; i < currLevel.grid[0].length; i++) {
    for (var j = 0; j < currLevel.grid.length; j++) {
      ch = currLevel.grid[j][i];
      if (ch === "player") {
        //console.log("adding player!!!!!!!!!");
        var player = new PlayerOne(this, i * 50, j * 50 - 125, AM.getAsset("./img/area51main.png"));
        this.addEntity(player);
        this.camera.follow(player, 100, 100);
      } else if (ch === "bird") {
        console.log("adding bird!");
        this.addEntity(new BirdEnemy(this, i * 50, j * 50, AM.getAsset("./img/bird_enemy_spritesheet.png")));
      } else if (ch === "platform") {
        var mult = 1;
        while (j + mult < currLevel.grid.length && currLevel.grid[j+mult][i] === "platform") {
          currLevel.grid[j+mult][i] = "used_platform";
          mult += 1;
        }

        this.platforms.push((new Platform(AM.getAsset("./img/textures.png"), this, i * 50, j * 50, 50, 50 * mult, "X")));
      } else if (ch === "platformtop") {
        this.platforms.push((new Platform(AM.getAsset("./img/textures.png"), this, i*50, j*50, 50, 50, "T")));
      } else if (ch === "dragon") {
          this.addEntity(new Dragon(this, i * 50, j * 50, AM.getAsset("./img/dragon.png")));
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
        this.exits.push((new Exit(AM.getAsset("./img/textures.png"), this, i*50, j*50, 50, 50, "exit", exitDir)));
      } else if (ch === "used_platform") {
        currLevel.grid[j][i] = "platform";
      }
    }
  }
}

GameEngine.prototype.switchLevel = function(exitedFrom, i, j) {
  // console.log(this.currentWorld);
  // console.log(i);
  // console.log(j);
  // console.log(exitedFrom);
  this.clearLevel();
  console.log(this.currentWorld.rooms[i][j-1]);
  if (exitedFrom === "north") {
    this.currentWorld.currentRoom = this.currentWorld.rooms[i-1][j];
  } else if (exitedFrom === "south") {
    this.currentWorld.currentRoom = this.currentWorld.rooms[i+1][j];
  } else if (exitedFrom === "east") {
    this.currentWorld.currentRoom = this.currentWorld.rooms[i][j+1];
  } else if (exitedFrom === "west") {
    this.currentWorld.currentRoom = this.currentWorld.rooms[i][j-1];
  }
  //console.log(this.currentWorld.currentRoom);

  this.setLevel();
}
GameEngine.prototype.start = function () {
    console.log("starting game");
    this.generateWorlds();
    this.currentWorld = this.worlds["Area 51"];
    //console.log(this.currentWorld);
    this.setLevel();

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
        if (e.keyCode === 37) that.left = true;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 39) that.right = true;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 38) that.up = true;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 40) that.down = true;
          //console.log(e);
        e.preventDefault();
    }, false);


    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 90) that.jump = true;
          //console.log(e);
        e.preventDefault();
    }, false);


    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.keyCode === 88) that.fire = true;
          //console.log(e);
        e.preventDefault();
    }, false);


    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 88) that.fire = false;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 90) that.jump = false;
          //console.log(e);
        e.preventDefault();
    }, false);


    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 37) that.left = false;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 39) that.right = false;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 38) that.up = false;
          //console.log(e);
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.keyCode === 40) that.down = false;
          //console.log(e);
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
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    if (this.camera != null) {
      this.ctx.translate(-this.camera.xView, -this.camera.yView);
    }
    //console.log(this.backgroundImage)
    this.backgroundImage.draw(this.ctx);              //Probably should change how we do this

    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    for (var i = 0; i < this.platforms.length; i++) {//SHOULDNT NEED THIS ONCE ENTITIES IS FIXED
        this.platforms[i].draw(this.ctx);
    }

    if (this.deadBirds >= 9) {
      this.ctx.fillStyle = "blue";
      this.ctx.font = "bold 32px Arial";
      this.ctx.fillText("You killed all 9 birds!", this.camera.xView + 100, this.camera.yView + 100);
    }
    if(this.camera != null && this.running) {
       this.ctx.fillStyle = "Red";
        this.ctx.font = "bold 18px sans-serif";
        this.ctx.fillText("Life " + this.health+"/"+this.maxHealth, this.camera.xView + 15, this.camera.yView + 15);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.camera.xView + 20, this.camera.yView + 20, 100, 15);
        if (this.health > 66) {
            this.ctx.fillStyle = "green";
        } else if (this.health > 33 && this.health <= 66) {
            this.ctx.fillStyle = "yellow";
        } else {
            this.ctx.fillStyle = "red";
        }
        this.ctx.fillRect(this.camera.xView + 20, this.camera.yView + 20, 100 * this.percent, 15);
        this.ctx.fillStyle = "Red";
        this.ctx.font = "bold 18px sans-serif";
        this.ctx.fillText("Lives " + this.lives, this.camera.xView + 700, this.camera.yView + 15);
        this.ctx.restore();
    }
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    var platformCount = this.platforms.length;

    // for (var i = 0; i < platformCount; i++) {
    //   var plat = this.platforms[i];
    //   if (!plat.removeFromWorld) {
    //     plat.update();
    //   }
    // }

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
