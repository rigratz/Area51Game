/*
  AlienBoss is the final boss of the game. The following object contains
  all of the functions necessary to handle its AI, collision detection, health
  data, sounds, and animation.

  The boss is comprised of a head, a left hand, and a right hand. the AlienBoss
  class represents the head.
*/
function AlienBoss(game, x, y, spritesheet) {
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.leftHand = new LeftHand(game, x, y, spritesheet, this);
    this.rightHand = new RightHand(game, x, y, spritesheet, this);
    game.addEntity(this.leftHand); game.addEntity(this.rightHand);

    this.boundingRect = new BoundingRect(0,0,0,0);
    this.leftMoving = false;
    this.rightMoving = true;
    this.xvel = 100;
    this.removeFromWorld = false;
    this.collided = false;
    this.leftEye = new BoundingRect(x, y, 0, 0);
    this.rightEye = new BoundingRect(x, y, 0, 0);

    this.laserEyeTime = 0;

    this.debug = false;
    this.health = 1000;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_head", spritesheet, 250, 330, 0.2, 6, true, false, "alien_head");
    //781, 300
    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

}
AlienBoss.prototype = new Entity();
AlienBoss.prototype.constructor = AlienBoss;

/*
  draw function is used to draw the current frame of the AlienBoss. If debug is
  set to true, also draws the enemy's bounding box.
*/
AlienBoss.prototype.draw = function () {
  if (!this.game.running) return;
  this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  var bb = this.leftEye;
  if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
  }
  bb = this.rightEye;
  if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
  }
  Entity.prototype.draw.call(this);
}

/*
  update function is responsible for managing the current state of AlienBoss
  based on its AI functionality or any damage it may have recieved from the
  player.
*/
AlienBoss.prototype.update = function () {
  if (this.xvel === 100 && this.x >= 900) this.xvel = -100;
  if (this.xvel === -100 && this.x <= 300) this.xvel = 100;
  this.x += this.xvel * this.game.clockTick;
  this.leftEye = new BoundingRect(this.x+20, this.y+100, 97, 115);
  this.rightEye = new BoundingRect(this.x+20+105+7, this.y+100, 97, 115);

  this.laserEyeTime += this.game.clockTick;
  if (this.laserEyeTime > 5) {
    this.game.addEntity(new Bullet(this.game, this.x + 65, this.y + 100, AM.getAsset("./js/img/fireball.png"), "dragon"))
    this.game.addEntity(new Bullet(this.game, this.x + 20+105+7+45, this.y + 100, AM.getAsset("./js/img/fireball.png"), "dragon"));
    this.laserEyeTime = 0;
  }
  for (var i = 0; i < this.game.entities.length; i++) {
      var entity = this.game.entities[i];
      if (entity instanceof Bullet && entity.x > 0 && entity.dir != "dragon") {
          if (entity.collideEnemy(this)) {
              this.damageSound.play();
              this.health -= this.game.bulletDamage;
              if (this.health <= 0) {
                  this.removeFromWorld = true;
                  this.leftHand.removeFromWorld = true;
                  this.rightHand.removeFromWorld = true;
                  this.game.alienBossDead = true;

              }
              entity.removeFromWorld = true;
          }
      }
  }
}

/*
  collide function is used to check if the current entity's bounding box
  has intersected with another entity's bounding box, which would necessitate
  some sort of collision response.
*/
AlienBoss.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

/*
  The following 4 collision methods are used to check where specifically a
  bounding box intersection/collision may have occured.
*/
AlienBoss.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
AlienBoss.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
AlienBoss.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
AlienBoss.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}

/*
  LeftHand represents the left hand of the AlienBoss. It moves independently
  of the head, and contains its own logic and animation.
*/
function LeftHand(game, x, y, spritesheet, boss) {
    this.boss = boss;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x - 400;
    this.y = y + 100;

    this.xvel = 0;
    this.yvel = 175;
    this.removeFromWorld = false;
    this.collided = false;

    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_lhand", spritesheet, 400, 550, 0.2, 6, true, false, "alien_lhand");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

}
LeftHand.prototype = new Entity();
LeftHand.prototype.constructor = LeftHand;

/*
  draw function is used to draw the current frame of the LeftHand. If debug is
  set to true, also draws the enemy's bounding box.
*/
LeftHand.prototype.draw = function () {
  if (!this.game.running) return;
  this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  var bb = this.boundingRect;
  if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
  }
  Entity.prototype.draw.call(this);
}

/*
  update function is responsible for managing the current state of LeftHand
  based on its AI movement behavior.
*/
LeftHand.prototype.update = function () {
  if (this.boss.leftMoving) {
    if (this.yvel === 175 && this.y >= 700) {
      this.yvel = 0;
      this.xvel = 250;
    }
    else if (this.xvel === 250 && this.x >= 825) {
      this.yvel = 0;
      this.xvel = -250;
    }
    else if (this.xvel === -250 && this.x <= 200) {
      this.yvel = -175;
      this.xvel = 0;
    }
    else if (this.yvel === -175 && this.y <= 400) {
      this.yvel = 175;
      this.xvel = 0;
      this.boss.leftMoving = false;
      this.boss.rightMoving = true;
    }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
    this.boundingRect = new BoundingRect(this.x + 75, this.y +75, 175, 200);
  }
}
/*
  collide function is used to check if the current entity's bounding box
  has intersected with another entity's bounding box, which would necessitate
  some sort of collision response.
*/
LeftHand.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
/*
  The following 4 collision methods are used to check where specifically a
  bounding box intersection/collision may have occured.
*/
LeftHand.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
LeftHand.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
LeftHand.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
LeftHand.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}

/*
  RightHand represents the right hand of the AlienBoss. It moves independently
  of the head, and contains its own logic and animation.
*/
function RightHand(game, x, y, spritesheet, boss) {
    this.boss = boss;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x + 225;
    this.y = y + 100;


    this.xvel = 0;
    this.yvel = 175;
    this.removeFromWorld = false;
    this.collided = false;

    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_rhand", spritesheet, 470, 300, 0.2, 6, true, false, "alien_rhand");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

}
RightHand.prototype = new Entity();
RightHand.prototype.constructor = RightHand;

/*
  draw function is used to draw the current frame of the RightHand. If debug is
  set to true, also draws the enemy's bounding box.
*/
RightHand.prototype.draw = function () {
  if (!this.game.running) return;
  this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  var bb = this.boundingRect;
  if (this.debug) {
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
  }
  Entity.prototype.draw.call(this);
}

/*
  update function is responsible for managing the current state of RightHand
  based on its AI movement behavior.
*/
RightHand.prototype.update = function () {
    if (this.boss.rightMoving) {

      if (this.yvel === 175 && this.y >= 700) {
        this.yvel = 0;
        this.xvel = -250;
      }
      else if (this.xvel === -250 && this.x <= 200) {
        this.yvel = 0;
        this.xvel = 250;
      }
      else if (this.xvel === 250 && this.x >= 825) {
        this.yvel = -175;
        this.xvel = 0;
      }
      else if (this.yvel === -175 && this.y <= 400) {
        this.yvel = 175;
        this.xvel = 0;
        this.boss.leftMoving = true;
        this.boss.rightMoving = false;
      }
      this.x += this.xvel * this.game.clockTick;
      this.y += this.yvel * this.game.clockTick;
      this.boundingRect = new BoundingRect(this.x + 150, this.y +75, 200, 175);
    }
}

/*
  collide function is used to check if the current entity's bounding box
  has intersected with another entity's bounding box, which would necessitate
  some sort of collision response.
*/
RightHand.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

/*
  The following 4 collision methods are used to check where specifically a
  bounding box intersection/collision may have occured.
*/
RightHand.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
RightHand.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
RightHand.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
RightHand.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}
