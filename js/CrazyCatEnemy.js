/**
 * Created by shmurphy on 2/23/16.
 */
function CrazyCatEnemy(game, x, y, spritesheet, size) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = true;
    this.spritesheet = spritesheet;
    this.animation = new Animation("crazycat", spritesheet, 150, 150, 0.10, 7, true, false, size);
    this.health = 30;
    this.damage = 5;
    this.size = size;
    Entity.call(this, game, this.x, this.y);
}


CrazyCatEnemy.prototype = new Entity();
CrazyCatEnemy.prototype.constructor = CrazyCatEnemy;


CrazyCatEnemy.prototype.draw = function () {
    if (!this.game.running) return;
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    //console.log(bb);
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
CrazyCatEnemy.prototype.update = function() {

    this.boundingRect = new BoundingRect(this.x+10, this.y, (this.animation.frameWidth -10) * this.size, this.animation.frameHeight * this.size);
    for (var i = 0; i < this.game.platforms.length; i++) {
        if (this.collide(this.game.platforms[i])) {
            this.xvel = this.xvel * -1;
            break;
        }
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            //console.log("bullet: ", entity.x, ", ", "bird: ", this.x);
            if (entity.collideEnemy(this)) {
                this.health -= this.damage;
                if(this.health === 0) {
                    this.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
        }
    }

    //this.x += this.xvel * this.game.clockTick;
    //this.y += this.yvel * this.game.clockTick;
}
CrazyCatEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
