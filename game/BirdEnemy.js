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

    Entity.call(this, game, this.x, this.y);
    // this.rightAnimation = new Animation("bird_enemy", spritesheet, 95, 200, 0.14, 8, true, false, "right");
    // this.leftAnimation = new Animation("bird_enemy", spritesheet, 95, 300, 0.14, 8, true, false, "left");
    this.animation = this.idleAnimation;
}


BirdEnemy.prototype = new Entity();
BirdEnemy.prototype.constructor = BirdEnemy;


BirdEnemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
BirdEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x + 40, this.y + 50, 2 * 95, 2 * 100);
    //this.x += this.xvel * this.game.clockTick;
    //this.y += this.yvel * this.game.clockTick;
    Entity.prototype.update.call(this);
}

