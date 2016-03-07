function EyeBoss(game, x, y, spritesheet, xvel) {
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
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
    this.health = 500;
    this.damage = 10;

    this.idleAnimation = new Animation("eye_boss", spritesheet, 0, 0, 0.2, 1, true, false, "idle");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);

    this.weakSpotCounter = 5;
}

EyeBoss.prototype = new Entity();
EyeBoss.prototype.constructor = EyeBoss;

EyeBoss.prototype.draw = function () {
    if (!this.game.running) return;

    /*
    Try to do timer things so they sync up with the frams being drawn in animation.
    The syncage is causing the issues. Mayeb access the game clock? Or hard reset the frames somehow in the animaton
    class when drawing.
    */
    if (this.awake) {
        this.animationTimer++;
        if (this.animationTimer < 300) {
            this.animation = this.idleAnimation;
            if (this.animationTimer > 260) {
                this.screamSound.play();
            }
        }
        else {
            this.animation = this.screamAnimation;
            this.attackTimer++;
            if (this.attackTimer < 45) {
                this.attack.canDamage = true;
                this.attack.animation.drawFrame(this.attack.game.clockTick, this.attack.ctx, this.attack.x, this.attack.y);
            }
            if (this.attackTimer > 45 && this.attackTimer < 90) {
                this.attack.canDamage = false;
                this.attack2.canDamage = true;
                this.attack2.animation.drawFrame(this.attack.game.clockTick, this.attack.ctx, this.attack2.x, this.attack2.y);
            }
            if (this.attackTimer > 90 && this.attackTimer < 135) {
                this.attack2.canDamage = false;
                this.attack3.canDamage = true;
                this.attack3.animation.drawFrame(this.attack.game.clockTick, this.attack.ctx, this.attack3.x, this.attack3.y);
            }
        }
        if (this.animationTimer > 440) {
            this.attack.canDamage = false;
            this.attack2.canDamage = false;
            this.attack3.canDamage = false;
            this.attackTimer = 0;
            this.animationTimer = 0;
        }
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        var bb = this.boundingRect;
        if (this.debug) {
            this.ctx.strokeStyle = "blue";
            this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
            bb = this.attack.boundingRect;
            this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
            bb = this.attack2.boundingRect;
            this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
            bb = this.attack3.boundingRect;
            this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
        }
        Entity.prototype.draw.call(this);
    }
}
EyeBoss.prototype.update = function() {
    var dist = distance(this.game.player, this);
    if (dist < 1500) {   // "visual radius" the boss will wake up at
        this.awake = true;
    }
    if (this.game.player)
    if (this.awake) {
        this.boundingRect = new BoundingRect(this.x+100, this.y+0, this.animation.frameWidth*1.5, this.animation.frameHeight*1.5);
        for (var i = 0; i < this.game.platforms.length; i++) {
          if (this.collide(this.game.platforms[i])) {
            this.y = this.game.platforms[i].y - this.animation.frameHeight * 1.5 + 1;   //Tweak to change where his bottom touches the ground
            break;
          }
        }
        if (this.xvel === 0) this.animation = this.idleAnimation;

        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if (entity instanceof Bullet && entity.x > 0) {
                if (entity.collideEnemy(this)) {
                    this.damageSound.play();
                    this.health -= this.damage;
                    if (this.health <= 0) {
                        //this.game.eyeBossDead = true;
                        this.removeFromWorld = true;
                    }
                    entity.removeFromWorld = true;
                }
            }
            if (entity instanceof PlayerOne) {
                if (this.attackTimer < 2) {
                    this.attack.x =  entity.x - this.attack.animation.frameWidth / 2;
                    this.attack2.x = this.attack.x - 200;
                    this.attack3.x = this.attack.x - 400;
                    // this.attack.y =  entity.y - 30;
                    // this.attack2.y = entity.y - 30;
                    // this.attack3.y = entity.y - 30;
                    this.attack.boundingRect = new BoundingRect(this.attack.x+100, this.attack.y+25, this.attack.animation.frameWidth*0.5, this.attack.animation.frameHeight*1.5);
                    this.attack2.boundingRect = new BoundingRect(this.attack2.x+100, this.attack2.y+25, this.attack2.animation.frameWidth*0.5, this.attack2.animation.frameHeight*1.5);
                    this.attack3.boundingRect = new BoundingRect(this.attack3.x+100, this.attack3.y+25, this.attack3.animation.frameWidth*0.5, this.attack3.animation.frameHeight*1.5);
                }
            }
        }
        this.x += this.xvel * this.game.clockTick;
        this.y += this.yvel * this.game.clockTick;
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
    this.debug = true;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.spriteSheet = spritesheet;
    this.animation = new Animation("eye_boss_weakspot", spritesheet, 65, 50, 0.2, 5, true, false, "idle");
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
                }
                entity.removeFromWorld = true;
            }
        }
    }
}
