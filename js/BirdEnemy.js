function BirdEnemy(game, x, y, spritesheet, xvel) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.xvel = xvel;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = true;
    this.health = 30;
    this.damage = 10;
    this.idleAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "idle");
    this.rightAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "right");
    this.leftAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "left");
    this.catAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "cat");
    this.animation = this.idleAnimation;
    this.speed = 2.5;
    this.following = false;
    Entity.call(this, game, this.x, this.y);
    this.collidePlatform = false;
}


BirdEnemy.prototype = new Entity();
BirdEnemy.prototype.constructor = BirdEnemy;


BirdEnemy.prototype.draw = function () {
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
BirdEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x+45, this.y+50, this.animation.frameWidth+45, this.animation.frameHeight+45);
    for (var i = 0; i < this.game.platforms.length; i++) {
        if (this.collide(this.game.platforms[i])) {
            if(!this.following) {
                console.log("colliding with platform, not following");
                this.xvel = this.xvel * -1;
            } else {
                console.log("colliding with the platform, yes following");
            }
            this.collidePlatform = true;
            //break;

        } else {
            //console.log("not colliding with platform!");
            this.collidePlatform = false;
        }
    }
    if (this.xvel === 0) this.animation = this.idleAnimation;
    else if(this.xvel === 2) this.animation = this.catAnimation;
    else if (this.xvel > 0) this.animation = this.rightAnimation;
    else if (this.xvel < 0) this.animation = this.leftAnimation;

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                console.log(this.health);
                this.health -= this.damage;
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
        }

        /** right now works only for x coordinate chasing */
        if (entity instanceof PlayerOne) {
            var dist = distance(this, entity);
            //console.log("DISTANCE: ", dist);
            if(!this.collidePlatform) {
                if (dist < 400) {   // the "visual radius", when the enemies will start following you
                    console.log("NOT colliding but YES following");

                    var difX = (entity.x - this.x) / dist;
                    //var difY = (entity.y - this.y) / dist;
                    this.x += difX * this.speed;
                    //this.y += difY * this.speed;
                    this.following = true;
                } else {
                    this.following = false;
                }
                //if(this.x > entity.x) {
                //    this.animation = this.leftAnimation;
                //}
            }
        }
    }
    if(!this.following && !this.collidePlatform) {
        console.log("doing the normal AI");
        this.x += this.xvel * this.game.clockTick;
        this.y += this.yvel * this.game.clockTick;
    }

}

BirdEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
