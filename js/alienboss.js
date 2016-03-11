//alienboss.js
function AlienBoss(game, x, y, spritesheet) {
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.leftHand = new LeftHand(game, x, y, spritesheet, this);
    this.rightHand = new RightHand(game, x, y, spritesheet, this);
    this.leftMoving = false;
    this.rightMoving = true;
    this.xvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.leftEye = new BoundingRect(x, y, 0, 0);
    this.rightEye = new BoundingRect(x, y, 0, 0);

    this.debug = false;
    this.health = 1000;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_head", spritesheet, 120, 130, 0.2, 6, true, false, "head");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

    this.weakSpotCounter = 5;
}
AlienBoss.prototype = new Entity();
AlienBoss.prototype.constructor = AlienBoss;
AlienBoss.prototype.draw = function () {
  if (!this.game.running) return;
  this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
  // var bb = this.boundingRect;
  // if (this.debug) {
  //     this.ctx.strokeStyle = "blue";
  //     this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
  // }
  Entity.prototype.draw.call(this);
}
AlienBoss.prototype.update = function () {
}
AlienBoss.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
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
function LeftHand(game, x, y, spritesheet, boss) {
    this.boss = boss;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;

    this.leftMoving = false;
    this.rightMoving = true;
    this.xvel = 0;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;

    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_lhand", spritesheet, 120, 130, 0.2, 6, true, false, "lhand");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

}
function LeftHand(game, x, y, spritesheet, boss) {
    this.boss = boss;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;

    this.leftMoving = false;
    this.rightMoving = true;
    this.xvel = 0;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;

    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("alien_lhand", spritesheet, 120, 130, 0.2, 6, true, false, "lhand");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

}
