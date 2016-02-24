function Bullet(game, x, y, dir) {//, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.xvel = 0;
    this.yvel = 0;
    this.startX = x;
    this.startY = y;

    this.distanceTraveled = 0;
    if (dir === "up") {
      this.yvel = -650;
    } else if (dir === "left") {
      this.xvel = -650;
    } else if (dir === "right") {
      this.xvel = 650;
    }
    this.boundingRect = new BoundingRect(x, y, 5, 5);
    //this.debug = true;
    //this.idleAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.14, 8, true, false, "idle");

    Entity.call(this, game, this.x, this.y);

    //this.animation = this.idleAnimation;
}

Bullet.prototype.update = function() {
  this.x += this.xvel * this.game.clockTick;
  this.y += this.yvel * this.game.clockTick;
  this.distanceTraveled = (this.x - this.startX) + (this.y - this.startY);
  if (Math.abs(this.distanceTraveled) > 650) this.removeFromWorld = true;

  for (var i = 0; i < this.game.platforms.length; i++) {
    if (this.collideEnemy(this.game.platforms[i])) {
      this.removeFromWorld = true;
      break;
    }
  }
    // trying to add something here to remove the bullet from the world when it collides with platforms.
}

Bullet.prototype.draw = function () {
  this.ctx.strokeStyle = "yellow";
  this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "orange";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  //Entity.prototype.draw.call(this);
}


// for some reason can't get this to work using the bullet bounding box, so I used x and y
Bullet.prototype.collideEnemy = function(other) {
    return (this.x <= (other.boundingRect.right - (other.boundingRect.width / 2))) &&
        (this.x > other.boundingRect.left) &&
        (this.y > (other.boundingRect.top) && (this.y < other.boundingRect.bottom));
}
