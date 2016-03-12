function Dragon(game, x, y, spritesheet) {
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
    this.animation = new Animation("dragon", spritesheet, 96, 96, 0.14, 3, true, false, "idle");
    this.health = 60;
    this.damage = 10;
    this.flameTime = 0;
    this.bullet = null;
    Entity.call(this, game, this.x, this.y);
    // console.log("this.x = ");
    // console.log(this.x);
    // console.log("bbox.x = ");
    // console.log(this.boundingRect.x);
}


Dragon.prototype = new Entity();
Dragon.prototype.constructor = Dragon;


Dragon.prototype.draw = function () {
        if (!this.game.running) return;
    /** draw the bullet before the dragon so it's behind him **/
    // if (this.bullet === null) {
    //     this.bullet = new Bullet(this.game, this.x + 38, this.y + 65, AM.getAsset("./js/img/fireball.png"), "dragon");
    //     this.game.addEntity(this.bullet);
    //
    // } else {
    //     if (Math.abs(this.bullet.distanceTraveled) > 400) {
    //         this.bullet = new Bullet(this.game, this.x + 38, this.y + 65, AM.getAsset("./js/img/fireball.png"), "dragon");
    //         this.game.addEntity(this.bullet);
    //     }
    // }


    //this.bullet.debug = true;
    //if(this.bullet.deb)
    if (this.bullet != null){
    this.bullet.boundingRect = new BoundingRect(this.bullet.x + 10, this.bullet.y, 45, 130);
    this.bullet.animation = this.bullet.flameAnimation;
    this.bullet.animation.drawFrame(this.bullet.game.clockTick, this.bullet.ctx, this.bullet.x, this.bullet.y);
  }

    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}
Dragon.prototype.update = function() {
     this.boundingRect = new BoundingRect(this.x + 40, this.y + 35, 70, 100);

     this.flameTime += this.game.clockTick;
     if (this.flameTime > 2) {
       this.game.addEntity(new Bullet(this.game, this.x + 38, this.y + 65, AM.getAsset("./js/img/fireball.png"), "dragon"));
       this.flameTime = 0;
     }

    for (var i = 0; i < this.game.platforms.length; i++) {
      if (this.collide(this.game.platforms[i])) {
        this.xvel = this.xvel * -1;
        //console.log("kaboom");
        //console.log(this.xvel);
        break;
      }
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];
        if (entity instanceof PlayerOne && this.bullet != null) {
           // console.log("player!");
             if (this.bullet.flameCollidePlayer(entity)) {
                this.bullet = null;
              }
        }

        if (entity instanceof Bullet && entity.x > 0) {
            //console.log("bullet: ", entity.x, ", ", "bird: ", this.x);
            if(entity.dir != "dragon") {
                if (entity.collideEnemy(this)) {
                    this.damageSound.play();
                    this.health -= this.game.bulletDamage;
                    if (this.health <= 0) {
                        this.removeFromWorld = true;
                        var rand = Math.random();
                        //console.log(rand);
                        if (rand < 0.25) {
                            var health = new Health(AM.getAsset("./js/img/health.png"), this.game, this.x + 40, this.y + 35, 30, 30);
                            this.game.addEntity(health);
                        }
                    }
                    entity.removeFromWorld = true;
                }
            }
        }
    }
    Entity.prototype.update.call(this);

}
Dragon.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}
