function TreeBoss(game, x, y, spritesheet, xvel) {
    this.screamSound = AM.getAudioAsset("./js/sound/monster_scream.wav");
    console.log("YOOOOOOO");
    console.log(this.screamSound);
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
    this.health = 200;
    this.damage = 50;
    this.animationTimer = 0;
    this.idleAnimation = new Animation("tree_boss", spritesheet, 218, 314, 0.2, 1, true, false, "idle");
    this.screamAnimation = new Animation("tree_boss", spritesheet, 218, 314, 0.2, 12, true, false, "screaming");
    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);
    this.attack = new TreeBossAttack(game, this.x - 200, this.y + this.animation.frameHeight, spritesheet, 2);
    game.addEntity(this.attack);
}

function TreeBossAttack(game, x, y, spritesheet, xvel) {
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
    this.animation = new Animation("tree_boss_attack", spritesheet, 218, 100, 0.1, 8, true, false, "attacking");
    Entity.call(this, game, this.x, this.y);
}

TreeBoss.prototype = new Entity();
TreeBoss.prototype.constructor = TreeBoss;

TreeBossAttack.prototype = new Entity();
TreeBossAttack.prototype.constructor = new Entity();

TreeBoss.prototype.draw = function () {
    if (!this.game.running) return;
    this.animationTimer++;
    if (this.animationTimer < 300) {
        this.animation = this.idleAnimation;
    }
    else {
        this.screamSound.play();
        this.animation = this.screamAnimation;
    }
    if (this.animationTimer > 432) {
        this.animationTimer = 0;
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    this.attack.animation.drawFrame(this.attack.game.clockTick, this.attack.ctx, this.attack.x, this.attack.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
TreeBoss.prototype.update = function() {
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
                console.log(this.health);
                this.health -= this.damage;
                if (this.health <= 0) {
                    this.removeFromWorld = true;
                }
                entity.removeFromWorld = true;
            }
        }
    }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
}
TreeBoss.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
