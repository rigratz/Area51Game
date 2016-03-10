function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function SnakeEnemy(game, x, y, spritesheet, size) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.positionX = x;
    this.y = y;
    this.xvel = 100;
    this.yvel = 0;
    this.boundingRect = new BoundingRect(x, y, 40, 50);
    this.debug = false;
    this.collided = false;
    this.damageSound = AM.getAudioAsset("./js/sound/enemy_damage_sound.wav");
    this.attackAnimation = new Animation("snake_enemy", spritesheet, 196.67, 130, 0.25, 6, true, false, "attack", size);
    this.idleAnimation = new Animation("snake_enemy", spritesheet, 196.67, 130, 0.25, 6, true, false, "idle", size);
    this.rightAnimation = new Animation("snake_enemy", spritesheet, 196.67, 130, 0.25, 6, true, false, "rightattack", size);
    this.idleAnimationRight = new Animation("snake_enemy", spritesheet, 196.67, 130, 0.25, 6, true, false, "rightidle", size);
    this.size = size;
    this.animation = this.idleAnimation;
    if(this.size === 2) {
        this.health = 700;
    } else {
        this.health = 100;
    }
    this.damage = 10;
    this.right = false;
    this.count = 0;
    this.switched = false;
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
        if(this.size === 2) { // boss snake
            this.boundingRect = new BoundingRect(this.x + 100, this.y - 200, 440, 340);
        } else {
            this.boundingRect = new BoundingRect(this.x + 20, this.y + 10, 200, 125);
        }
    } else {
        if(this.size === 2) {
            this.boundingRect = new BoundingRect(this.x, this.y - 200, 440, 340);
        } else {
            this.boundingRect = new BoundingRect(this.x, this.y + 10, 200, 125);
        }
    }

    if (this.falling) {
        this.yvel += 10;
    }
    for (var i = 0; i < this.game.platforms.length; i ++) {
        if (this.collide(this.game.platforms[i])) {
            if (this.collideBottom(this.game.platforms[i])) {
                this.yvel = 0;
                //this.y = this.game.platforms[i].y - (this.boundingRect.bottom - this.y);
                if(this.size === 2) {
                    // keep this.y the same because he won't be falling off any platforms
                } else {
                    this.y = this.game.platforms[i].y - (this.boundingRect.bottom - this.y) + 0.2;
                }
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
            if(entity.dir != "snail"){
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
            //console.log(dist);


            if(this.size === 2) { // boss
                this.count++;
                /**
                 * Where the snake switching positions happens, along with the player recoil
                 */
                if(this.count % 500 === 0 && !this.switched) {  // attacking left, switch sides
                    this.x -= 2000;
                    this.switched = true;
                } else if(this.count % 500 === 0 && this.switched) {    // attacking right, switch sides
                    this.x += 1300;
                    this.switched = false;
                } else if(!this.count % 500 === 0 && !this.switched) {  // idling left
                    this.animation = this.attackAnimation;
                    if(this.animation.frame === 4 ||this.animation.frame === 5 || this.animation.frame === 6) {
                        this.x -= 20;
                    } else {
                        this.x = this.positionX;
                    }
                } else if(!this.count % 500 === 0 && this.switched) {   // idling right
                    this.animation = this.rightAnimation;
                    if(this.animation.frame === 1 || this.animation.frame === 2 || this.animation.frame === 6) {
                        this.x += 20;
                    } else {
                        this.x = this.positionX - 2000;
                    }
                }

                if(!this.switched && this.collide(entity)) {
                    entity.recoilX = -1100;
                } else if (this.switched && this.collide(entity)) {
                    entity.recoilX = 1100;
                }



            } else {
                if (dist < (350 * this.size)) {
                    if(this.right) {
                        this.animation = this.rightAnimation;
                        //console.log("right attack")
                        if(this.animation.frame === 2) {
                            this.x += 5;
                        }
                    } else {
                        this.animation = this.attackAnimation;
                        //console.log("left attack");
                        if(this.animation.frame === 5) {
                            this.x -= 5;
                        }
                    }
                    if(this.y > entity.y) {
                        this.animation = this.idleAnimation;
                    }
                } else {
                    if(this.right) {
                        //console.log("right idle");
                        this.animation = this.idleAnimationRight;
                    } else {
                        //console.log("left idle")
                        this.animation = this.idleAnimation;
                    }
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
