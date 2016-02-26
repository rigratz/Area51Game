/**
 * Created by shmurphy on 2/23/16.
 */
function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function CrazyCatEnemy(game, x, y, spritesheet, size) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.spritesheet = spritesheet;
    this.animation = new Animation("crazycat", spritesheet, 150, 150, 0.10, 7, true, false, size);
    this.health = 30;
    this.damage = 5;
    this.size = size;
    this.following = false;
    this.speed = 2;
    //this.visualRadius = 200;
    //this.velocity = { x: Math.random() * 1000, y: Math.random() * 1000 };

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
            console.log("colliding");
            this.xvel = this.xvel * -1;
            if(this.following === true) {
                this.following = false;
            }  else if(this.following === false) {
                this.following = true;
            }
            // he's colliding, so don't follow
            break;
        } else {
            //this.following = true;      // not colliding, so follow
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

        // chasing
        if (entity instanceof PlayerOne) {
                var dist = distance(this, entity);
            //console.log("DISTANCE: ", dist);
            if (dist < 400 && this.following) {   // the "visual radius", when the enemies will start following you
                var difX = (entity.x - this.x) / dist;
                var difY = (entity.y - this.y) / dist;
                this.x += difX * this.speed;
                //this.following = true;
            } else if(dist > 400 && this.following) {
                this.following = false;
            } else if (dist < 400 && !this.following) {
                this.following = true;
            }
        }

    }

}
CrazyCatEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
