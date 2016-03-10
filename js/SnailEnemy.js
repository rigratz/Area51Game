function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function SnailEnemy(game, x, y, spritesheet, size) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.xvel = 100;
    this.yvel = 0;
    this.boundingRect = new BoundingRect(x, y, 100, 100);
    this.debug = true;
    this.collided = false;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.rightAnimation = new Animation("snail_enemy", spritesheet, 50, 50, 0.2, 10, true, false, "right", size);
    this.leftAnimation = new Animation("snail_enemy", spritesheet, 50, 50, 0.2, 10, true, false, "left", size);
    this.animation = this.rightAnimation;
    this.size = size;
    this.health = 60;
    this.damage = 10;
    this.right = false;
    this.bullet = null;
    Entity.call(this, game, this.x, this.y);
    // console.log("this.x = ");
    // console.log(this.x);
    // console.log("bbox.x = ");
    // console.log(this.boundingRect.x);
}


SnailEnemy.prototype = new Entity();
SnailEnemy.prototype.constructor = SnailEnemy;


SnailEnemy.prototype.draw = function () {
    if (!this.game.running) return;

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
SnailEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x, this.y + 30, 90, 65);
    if (this.falling) {
        this.yvel += 10;
    }
    for (var i = 0; i < this.game.platforms.length; i ++) {
        if (this.collide(this.game.platforms[i])) {
            if (this.collideBottom(this.game.platforms[i])) {
                this.yvel = 0;
                this.y = this.game.platforms[i].y - (this.boundingRect.bottom - this.y);
                this.falling = false;
            }
        } else {
            this.falling = true;
        }
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            //console.log("bullet: ", entity.x, ", ", "bird: ", this.x);
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.game.bulletDamage;
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                    var rand = Math.random();
                    console.log(rand);
                    if (rand < 0.25) {
                        var health = new Health(AM.getAsset("./js/img/health.png"), this.game, this.x + 40, this.y + 35, 30, 30);
                        this.game.addEntity(health);
                    }
                }
                entity.removeFromWorld = true;
            }
        }
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof PlayerOne) {
            var dist = distance(this, entity);

            if(entity.x > this.x) {
                this.right = true;
                this.animation = this.rightAnimation;
                this.x += 10 * this.game.clockTick;
            } else {
                this.right = false;
                this.animation = this.leftAnimation;
                this.x -= 10 * this.game.clockTick;
            }


        }
    }
    //this.game.addEntity(bullet);
    this.y += this.yvel * this.game.clockTick;
    //var bullet = null;

    if(this.animation.frame === 7) {
        if (this.bullet === null) {
            if(this.right) {
                this.bullet = new Bullet(this.game, this.x + 95, this.y + 75, "", "snail");
            } else {
                this.bullet = new Bullet(this.game, this.x, this.y + 75, "", "snail_left");
            }
            this.game.addEntity(this.bullet);

        } else {
            if (Math.abs(this.bullet.distanceTraveled) > 50) {
                if(this.right) {
                    this.bullet = new Bullet(this.game, this.x + 95, this.y + 75, "", "snail");
                } else {
                    this.bullet = new Bullet(this.game, this.x, this.y + 75, "", "snail_left");
                }
                this.game.addEntity(this.bullet);
            }
        }
    }
    //} && Math.abs(bullet.distanceTraveled) > 650) {
    //    bullet = new Bullet(this.game, this.x + 100, this.y + 75, "", "snail");
    //    //bullet.shooting = true;
    //    this.game.addEntity(bullet);
    //}

}
SnailEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

SnailEnemy.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
SnailEnemy.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
SnailEnemy.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
SnailEnemy.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;
}