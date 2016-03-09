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

    this.falling = true;

    this.yvel = 0;
    this.removeFromWorld = false;
    this.collided = false;
    this.boundingRect = new BoundingRect(x, y, 0, 0);
    this.debug = false;
    this.spritesheet = spritesheet;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.animation = new Animation("crazycat", spritesheet, 150, 150, 0.10, 7, true, false, size);
    this.health = 40;
    this.damage = 5;
    this.size = size;
    this.following = false;
    this.speed = 1;
    this.yvel = 0;
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

    if (this.size === 0.6) this.boundingRect = new BoundingRect(this.x+25, this.y + 40, 150 * this.size - 45, 150 * this.size - 30);
    if (this.size === 1) this.boundingRect = new BoundingRect(this.x+40, this.y + 40, 150 * this.size - 70, 150 * this.size - 40);
    // if(this.game.hasBulletUpgrade) {
    //     this.damage = 10;
    // }

    if (this.falling) {
      this.yvel += 10;
    }
    for (var i = 0; i < this.game.platforms.length; i ++) {
        if (this.collide(this.game.platforms[i])) {
          if (this.collideBottom(this.game.platforms[i])) {
            //console.log("this happened");
            //console.log(this.size);
            this.yvel = 0;
            // var additive = 0;
            // if (this.size === 1) additive = 151;
            // if (this.size === 0.6) additive = 91;
            this.y = this.game.platforms[i].y - (this.boundingRect.bottom - this.y + 1);
            //console.log (this.y);
            this.falling = false;
          } else {
            //this.falling = true;
          }
        } else {
          this.falling = true;
        }
    }
    for (var j = 0; j < this.game.entities.length; j++) {
        var entity = this.game.entities[j];
        //console.log(entity);
        if (entity instanceof Bullet && entity.x > 0) {
            if (entity.collideEnemy(this)) {
                this.damageSound.play();
                this.health -= this.game.bulletDamage;
                //console.log("health", this.health);

                if(this.health <= 0) {
                    this.removeFromWorld = true;
                    var rand = Math.random();
                    console.log(rand);
                    if (rand < .25) {
                        var health = new Health(AM.getAsset("./js/img/health.png"), this.game, this.x + 25, this.y + 40, 30, 30);
                        this.game.addEntity(health);
                    }
                }
                entity.removeFromWorld = true;
            }
        }

        /** checks to see if the player is close enough to follow,
         * if he runs into a wall, he is bumped back the slightest bit */
        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if (entity instanceof PlayerOne) {
                var dist = distance(this, entity);

                if (dist < 250) {   // "visual radius" the bird will start attacking the player at
                    var difX = ((entity.x - this.x) / dist) * this.size;
                    this.x += (difX * this.speed);
                }
            }
        }
        for (var i = 0; i < this.game.platforms.length; i++) {
            if (this.collide(this.game.platforms[i])) {
                if(this.collideLeft(this.game.platforms[i])) {
                    this.x += (2 * this.size);
                } else if(this.collideRight(this.game.platforms[i])) {
                    this.x -= (2 * this.size);
                }
            }
        }

    }
    this.y += this.yvel * this.game.clockTick;




}
CrazyCatEnemy.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

CrazyCatEnemy.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
        this.boundingRect.bottom >= other.boundingRect.bottom;
}
CrazyCatEnemy.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
        this.boundingRect.right >= other.boundingRect.right;
}
CrazyCatEnemy.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
        this.boundingRect.left <= other.boundingRect.left;
}
CrazyCatEnemy.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}
