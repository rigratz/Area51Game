function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function ShadowEnemyBound(game, x, y) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.boundingRect = new BoundingRect(x, y, 50, 50);
}

ShadowEnemyBound.prototype = new Entity();
ShadowEnemyBound.prototype.constructor = ShadowEnemyBound;

function ShadowEnemy(game, x, y, spritesheet, xvel) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    //this.falling = true;
    //this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = true;
    this.spritesheet = spritesheet;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.rightAnimation = new Animation("shadow_enemy", spritesheet, 64, 64, 0.09, 6, true, false, "right");
    this.leftAnimation = new Animation("shadow_enemy", spritesheet, 64, 64, 0.09, 6, true, false, "left");
    this.animation = this.rightAnimation;
    this.health = 60;
    this.damage = 5;
    this.xvel = xvel;
    //this.following = false;
    //this.speed = 1;

    Entity.call(this, game, this.x, this.y);
}

ShadowEnemy.prototype = new Entity();
ShadowEnemy.prototype.constructor = ShadowEnemy;

ShadowEnemy.prototype.draw = function () {
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
ShadowEnemy.prototype.update = function() {
    if (this.xvel > 0) {
        this.boundingRect = new BoundingRect(this.x + 40, this.y+30, 64, 64+20);
    }
    if (this.xvel < 0) {
        this.boundingRect = new BoundingRect(this.x + 20, this.y+30, 64, 64+20);
    }

    this.x += this.xvel;
    for (var j = 0; j < this.game.entities.length; j++) {
        var entity = this.game.entities[j];
        if (entity instanceof ShadowEnemyBound) {
            if (this.collideRight(entity)) {
                this.animation = this.leftAnimation;
                this.x = entity.boundingRect.left - (2 * this.animation.frameWidth) - 1;
                this.xvel *= -1;
            }
            if (this.collideLeft(entity)) {
                this.animation = this.rightAnimation;
                this.x = entity.boundingRect.left +  15;
                this.xvel *= -1;
            }
        }
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.game.bulletDamage;
                if(this.health <= 0) {
                    this.removeFromWorld = true;
                    var rand = Math.random();
                    console.log(rand);
                    if (rand < 0.25) {
                        var health = new Health(AM.getAsset("./js/img/health.png"), this.game, this.x + 25, this.y + 40, 30, 30);
                        this.game.addEntity(health);
                    }
                }
                entity.removeFromWorld = true;
            }
        }
        //console.log(this.x);
        for (var i = 0; i < this.game.platforms.length; i++) {

            if (this.collide(this.game.platforms[i])) {
                this.collidePlatform = true;
                if(this.collideBottom(this.game.platforms[i])) {
                    //The 2 * is for the frameHeight multiplier
                    this.y = this.game.platforms[i].boundingRect.top - (2 * this.animation.frameHeight) + 15;
                } else if(this.collideLeft(this.game.platforms[i])) {
                    this.animation = this.rightAnimation;
                    this.x = this.game.platforms[i].boundingRect.left +  15;
                    this.xvel *= -1;
                } else if(this.collideRight(this.game.platforms[i])) {
                    this.animation = this.leftAnimation;
                    this.x = this.game.platforms[i].boundingRect.left - (2 * this.animation.frameWidth) - 1;
                    this.xvel *= -1;
                }
            }
        }
    }
}

ShadowEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
ShadowEnemy.prototype.collideTop = function(other) {
    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
ShadowEnemy.prototype.collideLeft = function(other) {
    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
ShadowEnemy.prototype.collideRight = function(other) {
    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
ShadowEnemy.prototype.collideBottom = function(other) {
    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;
        //There were comments
}
