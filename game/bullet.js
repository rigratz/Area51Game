function Bullet(game, x, y, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.xvel = 300;
    this.yvel = 0;
    //this.boundingRect = new BoundingRect(x, y, 90, 124);
    //this.debug = true;
    //this.idleAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.14, 8, true, false, "idle");

    Entity.call(this, game, this.x, this.y);

    //this.animation = this.idleAnimation;
}

Bullet.prototype.update = function() {
  this.x += this.xvel * this.game.clockTick;
  this.y += this.yvel * this.game.clockTick;
}

Bullet.prototype.draw = function () {

  this.ctx.strokeStyle = "yellow";
  this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "orange";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
    Entity.prototype.draw.call(this);
}
