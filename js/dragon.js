function Dragon(game, x, y, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.xvel = 100;
    this.yvel = 0;
    this.boundingRect = new BoundingRect(x, y, 40, 50);
    this.debug = true;
    this.collided = false;
    this.animation = new Animation("dragon", spritesheet, 96, 96, 0.14, 3, true, false, "idle");
    this.health = 60;
    this.damage = 10;
    Entity.call(this, game, this.x, this.y);
    console.log("this.x = ");
    console.log(this.x);
    console.log("bbox.x = ");
    console.log(this.boundingRect.x);
}


Dragon.prototype = new Entity();
Dragon.prototype.constructor = Dragon;


Dragon.prototype.draw = function () {
        if (!this.game.running) return;

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
Dragon.prototype.update = function() {
     this.boundingRect = new BoundingRect(this.x +40, this.y + 35, 70, 100);

    for (var i = 0; i < this.game.platforms.length; i++) {
      if (this.collide(this.game.platforms[i])) {
        this.xvel = this.xvel * -1;
        //console.log("kaboom");
        //console.log(this.xvel);
        break;
      }
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            //console.log("bullet: ", entity.x, ", ", "bird: ", this.x);
            if (entity.collideEnemy(this)) {
                this.removeFromWorld = true;
                entity.removeFromWorld = true;
            }
        }
    }
    // if (this.collide()) {
    //   this.xvel = this.xvel * -1;
    // }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
}
Dragon.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
