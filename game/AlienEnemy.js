function AlienEnemy(game, x, y, spritesheet, xvel) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.xvel = xvel;
    this.yvel = 0;
    this.boundingRect = new BoundingRect(x, y, 90, 124);
    this.debug = false;
    this.idleAnimation = new Animation("alien_enemy", spritesheet, 102, 106, 0.10, 7, true, false, "idle");
    // this.rightAnimation = new Animation("alien_enemy", spritesheet, 95, 100, 0.10, 7, true, false, "right");
    // this.leftAnimation = new Animation("alien_enemy", spritesheet, 95, 100, 0.10, 7, true, false, "left");
    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);
}

AlienEnemy.prototype = new Entity();
AlienEnemy.prototype.constructor = BirdEnemy;

AlienEnemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
AlienEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x + 40, this.y + 50, 2 * 95, 2 * 100);
    for (var i = 0; i < this.game.platforms.length; i++) {
      if (this.collide(this.game.platforms[i])) {
        this.xvel = this.xvel * -1;
        break;
      }
    }
    if (this.xvel === 0) this.animation = this.idleAnimation;
    else if (this.xvel > 0) this.animation = this.rightAnimation;
    else if (this.xvel < 0) this.animation = this.leftAnimation;

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.removeFromWorld = true;
                entity.removeFromWorld = true;
                this.game.deadBirds += 1;
            }
        }
    }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
}
AlienEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
