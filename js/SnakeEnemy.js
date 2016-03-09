function SnakeEnemy(game, x, y, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.xvel = 100;
    this.yvel = 0;
    this.boundingRect = new BoundingRect(x, y, 40, 50);
    this.debug = false;
    this.collided = false;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.attackAnimation = new Animation("snake_enemy", spritesheet, 196, 150, 0.2, 6, true, false, "attack");
    this.idleAnimation = new Animation("snake_enemy", spritesheet, 196, 150, 0.2, 6, true, false, "idle");
    this.rightAnimation = new Animation("snake_enemy", spritesheet, 196, 130, 0.2, 6, true, false, "rightattack");
    this.idleAnimationRight = new Animation("snake_enemy", spritesheet, 196, 130, 0.2, 6, true, false, "rightidle");

    this.animation = this.idleAnimation;
    this.health = 60;
    this.damage = 10;
    Entity.call(this, game, this.x, this.y);
    // console.log("this.x = ");
    // console.log(this.x);
    // console.log("bbox.x = ");
    // console.log(this.boundingRect.x);
}


SnakeEnemy.prototype = new Entity();
SnakeEnemy.prototype.constructor = SnakeEnemy;


SnakeEnemy.prototype.draw = function () {
    if (!this.game.running) return;

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
SnakeEnemy.prototype.update = function() {
    if(this.animation === this.rightAnimation || this.animation === this.idleAnimationRight) {
        this.boundingRect = new BoundingRect(this.x + 20, this.y + 10, 160, 120);
    } else {
        this.boundingRect = new BoundingRect(this.x, this.y + 20, 160, 120);
    }

    if (this.falling) {
        this.yvel += 5;
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
            } else {
                this.right = false;
            }

            if (dist < 250) {
                if(this.right) {
                    this.animation = this.rightAnimation;
                    if(this.animation.frame === 2) {
                        this.x += 10;
                    }
                } else {
                    this.animation = this.attackAnimation;
                    if(this.animation.frame === 5) {
                        this.x -= 10;
                    }
                }
            } else {
                if(this.right) {
                    this.animation = this.idleAnimationRight;
                } else {
                    this.animation = this.idleAnimation;
                }
            }

        }
    }

    this.y += this.yvel * this.game.clockTick;
}
SnakeEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

SnakeEnemy.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
SnakeEnemy.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
SnakeEnemy.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
SnakeEnemy.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;
}