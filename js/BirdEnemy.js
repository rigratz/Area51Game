function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

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
    this.debug = false;
    this.health = 40;
    this.damage = 10;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.idleAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "idle");
    this.rightAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "right");
    this.leftAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "left");
    this.catAnimation = new Animation("bird_enemy", spritesheet, 95, 100, 0.10, 8, true, false, "cat");
    this.animation = this.idleAnimation;
    this.speed = 2.5;
    Entity.call(this, game, this.x, this.y);
    this.collidePlatform = false;
}

BirdEnemy.prototype = new Entity();
BirdEnemy.prototype.constructor = BirdEnemy;

BirdEnemy.prototype.draw = function () {
    if (!this.game.running) return;

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
BirdEnemy.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x+45, this.y+50, this.animation.frameWidth+45, this.animation.frameHeight+45);
    if (this.xvel === 0) this.animation = this.idleAnimation;
    else if(this.xvel === 2) this.animation = this.catAnimation;
    else if (this.xvel > 0) this.animation = this.rightAnimation;
    else if (this.xvel < 0) this.animation = this.leftAnimation;

    // if(this.game.hasBulletUpgrade) {
    //     this.damage = 20;
    // }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.game.bulletDamage;
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                    var rand = Math.random();
                    console.log(rand);
                    if (rand < 0.25) {
                        var health = new Health(AM.getAsset("./js/img/health.png"), this.game, this.x + 45, this.y + 50, 30, 30);
                        this.game.addEntity(health);
                    }
                }
                entity.removeFromWorld = true;
            }
        }
    }

    /** checks to see if the player is close enough to follow,
     * if the bird runs into a wall, he is bumped back the slightest bit */
    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof PlayerOne) {
            var dist = distance(this, entity);
            for (var i = 0; i < this.game.platforms.length; i++) {
                if (this.collide(this.game.platforms[i])) {
                    this.collidePlatform = true;
                    if(this.collideBottom(this.game.platforms[i])) {
                        this.y -= 1;
                    } else if(this.collideTop(this.game.platforms[i])) {
                        this.y += 0.75;
                    } else if(this.collideLeft(this.game.platforms[i])) {
                        this.x += 2;
                    } else if(this.collideRight(this.game.platforms[i])) {
                        this.x -= 3;
                    }
                }
            }

            if (dist < 400) {   // "visual radius" the bird will start attacking the player at
                var difX = (entity.x - this.x) / dist;
                this.x += difX * this.speed;
                var difY = (entity.y - this.y) / dist;
                this.y += difY * this.speed;
                if(this.boundingRect.left >= entity.boundingRect.right && !this.catAnimation) {
                    this.animation = this.leftAnimation;
                }
            }
        }
    }
}

BirdEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

BirdEnemy.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
BirdEnemy.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
BirdEnemy.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
BirdEnemy.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}
