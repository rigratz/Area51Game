function EyeBoss(game, x, y, spritesheet) {
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.health = 1000;
    this.damage = 10;
    this.collidePlatform = false;
    this.speed = 3;

    this.idleAnimation = new Animation("eye_boss", spritesheet, 120, 130, 0.2, 6, true, false, "idle");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

    this.weakSpotCounter = 5;
}

EyeBoss.prototype = new Entity();
EyeBoss.prototype.constructor = EyeBoss;

EyeBoss.prototype.draw = function () {
    if (!this.game.running) return;
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
EyeBoss.prototype.update = function() {
    if (this.health > this.game.eyeBossHealth) {
        this.health = this.game.eyeBossHealth;
        if (this.health <= 0) {
            this.game.eyeBossDead = true;
            this.removeFromWorld = true;
        }
    }
    this.boundingRect = new BoundingRect(this.x, this.y, this.animation.frameWidth * 2 -10, this.animation.frameWidth * 2);
    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.damage;
                if (this.health <= 0) {
                    this.game.eyeBossDead = true;
                    this.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
        }
        /*Follow*/
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
                if (dist < 1000) {   // "visual radius" the bird will start attacking the player at
                    var difX = (entity.x - this.x) / dist;
                    this.x += difX * this.speed;
                    var difY = (entity.y - this.y) / dist;
                    this.y += difY * this.speed;
                }
            }
        }
    }
}

EyeBoss.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

function EyeBossWeakSpot(game, x, y, spritesheet) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.x = x;
    this.y = y;
    this.debug = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.spriteSheet = spritesheet;
    this.animation = new Animation("eye_boss_weakspot", spritesheet, 64, 50, 0.2, 8, true, false, "idle");
    this.removeFromWorld = false;
    this.health = 50;
}

EyeBossWeakSpot.prototype = new Entity();
EyeBossWeakSpot.prototype.constructor = EyeBossWeakSpot;

EyeBossWeakSpot.prototype.draw = function () {
    if (!this.game.running) return;
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
EyeBossWeakSpot.prototype.update = function() {
    this.boundingRect = new BoundingRect(this.x+25, this.y+20, this.animation.frameWidth, this.animation.frameHeight+20);
    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.game.bulletDamage;
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                    this.game.eyeBossHealth -= 200;
                    //console.log(this.game.eyeBossHealth);
                }
                entity.removeFromWorld = true;
            }
        }
    }
}
EyeBoss.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
EyeBoss.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
EyeBoss.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
EyeBoss.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
EyeBoss.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}
function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
