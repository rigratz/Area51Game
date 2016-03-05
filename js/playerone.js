function PlayerOne(game, x, y, spritesheet) {
    //console.log("creating");
    this.laserSound = AM.getAudioAsset("./js/sound/laser.wav");
    this.jumpSound = AM.getAudioAsset("./js/sound/jump.wav");
    this.jumpSound2 = AM.getAudioAsset("./js/sound/jump.wav");
    this.damageSound = AM.getAudioAsset("./js/sound/damage.wav");
    this.game = game;
    this.ctx = game.ctx;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;
    this.platform = game.platforms[0];
    this.bullets = [];

    this.recoiling = false;
    this.recoilX = 0;
    this.recoilY = 0;
    this.recoilTime = 0;

    this.invincible = false;
    this.invincibilityTime = 0;


    this.powerups = [];
    this.currentPowerup = null;
    this.removeFromWorld = false;
    if (this.game.powerups[0] != " ")
        this.game.powerups.push(" ");
    this.currentPowerUp = " ";


    this.boundingRect = new BoundingRect(x, y, 90, 124);
    this.debug = true;

    this.falling = false;
    this.fallTime = 0;

    this.jumping = false;
    this.jumpHeight = 300;
    this.jumpTime = 0;
    this.totalJump = 2;

  //  this.game.health = 100;
    this.game.maxHealth = 100;
    this.game.percent = this.game.health / this.game.maxHealth;

    this.canShoot = true;
    this.shotCooldown = 0;

    this.changePowerUp = true;
    this.powerUpindex = 0;
    this.powerUpCooldown = 0;

    if (this.game.currentPowerup === "S") {
        this.speed = 100;
        this.maxSpeed = 250;
    } else {
        this.speed = 10;
        this.maxSpeed = 250;
    }
    if (this.game.currentPowerup === "B") {
        this.speed = 100;
        this.maxSpeed = 250;
    } else {
        this.speed = 10;
        this.maxSpeed = 250;
    }

    this.damage = 30;

    this.collideTime = 65;
    this.collideCounter = 0;

    this.dead = false;



    this.facing = "right";

    this.moveState = 0;
    this.idleAnimation = new Animation("player", spritesheet, 94, 105, 0.40, 2, true, false, "idle");
    this.idleLeftAnimation = new Animation("player", spritesheet, 93, 105, 0.40, 2, true, false, "idleleft");
    this.rightAnimation = new Animation("player", spritesheet, 90, 105, 0.25, 4, true, false, "right");
    this.leftAnimation = new Animation("player", spritesheet, 90, 105, 0.25, 4, true, false, "left");
    this.upAnimation = new Animation("player", spritesheet, 94, 139, 0.40, 1, true, false, "up");
    this.crouchAnimation = new Animation("player", spritesheet, 94, 80, 0.40, 1, true, false, "crouch");
    this.crouchLeftAnimation = new Animation("player", spritesheet, 94, 80, 0.40, 1, true, false, "crouchleft");
    this.jumpAnimation = new Animation("player", spritesheet, 70, 65, 0.15, 4, true, false, "jump");
    this.jumpLeftAnimation = new Animation("player", spritesheet, 70, 65, 0.15, 4, true, false, "jumpleft");

    this.animation = this.idleAnimation;
    Entity.call(this, game, this.x, this.y);
    console.log("created");
}

PlayerOne.prototype = new Entity();
PlayerOne.prototype.constructor = PlayerOne;

PlayerOne.prototype.reset = function () {
    this.x = this.startX;
    this.y = this.startY;
    this.xvel = 0;
    this.yvel = 0;
    this.removeFromWorld = false;
    this.platform = this.game.platforms[0];
    this.currentPowerUp = " ";
    this.bullets = [];
    this.health = 100;
    this.powerups = [];
    this.currentPowerup = null;

    this.boundingRect = new BoundingRect(this.x, this.y, 90, 124);
    this.debug = false;

    this.recoiling = false;
    this.recoilX = 0;
    this.recoilY = 0;
    this.recoilTime = 0;

    this.invincible = false;
    this.invincibilityTime = 0;

    this.falling = false;
    this.fallTime = 0;

    this.jumping = false;
    this.jumpHeight = 300;
    this.jumpTime = 0;
    this.totalJump = 2;

    this.speed = 10;
    this.maxSpeed = 250;

    this.canShoot = true;
    this.shotCooldown = 0;

    this.changePowerUp = true;
    this.powerUpindex = 0;
    this.powerUpCooldown = 0;

    this.collideTime = 65;
    this.collideCounter = 0;
    this.game.health = 100;
    this.game.percent = this.game.health / this.game.maxHealth;
    this.game.lives--;
    if (this.game.lives <= 0) {
        this.game.running = false;
        this.dead = true;
        this.game.playGame.reset();
        //this.game.playGame.update();
        //this.game.playGame.draw();
    }

    this.dead = false;



    this.facing = "right";

    this.moveState = 0;
    this.animation = this.idleAnimation;

    this.game.camera.follow(this, 400, 175);
    this.game.camera.update();

}



PlayerOne.prototype.draw = function () {
    if (this.dead || !this.game.running) return;
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    var bb = this.boundingRect;

    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}

PlayerOne.prototype.update = function() {

    //console.log(this.game.bulletDamage);
    //console.log(this.game.currentPowerUp);
    //console.log(this.facing);
    if (this.recoiling) {
      this.recoilTime += this.game.clockTick;
      //console.log(this.recoilTime);
      if (this.recoilTime >= 0.20) {
        console.log ("STOP RECOILING");
        this.recoiling = false;
        this.recoilTime = 0;
      }
    }
    if (this.invincible) {
      this.invincibilityTime += this.game.clockTick;
      if (this.invincibilityTime >= 2) {
        this.invincible = false;
        this.invincibilityTime = 0;
      }
    }
    this.game.camera.follow(this, 100, 100);

    //var collideExit = false;
    for (var i = 0; i < this.game.exits.length; i++) {
      if (this.collide(this.game.exits[i])) {
        //collideExit = true;
        if (this.game.exits[i].type === "exit") {
          this.game.switchLevel(this.game.exits[i].exitDir, this.game.currentWorld.currentRoom.iIndex, this.game.currentWorld.currentRoom.jIndex);
        } else if (this.game.exits[i].type = "portal") {
          console.log("TELEPORT");
          this.game.switchWorlds(this.game.currentWorld.name, this.game.exits[i].portalTo);
        }
        break;
      }
    }

    if (this.game.currentPowerUp === "S") {
      this.speed = 100;
      this.maxSpeed = 550;
    } else {
      this.speed = 10;
      this.maxSpeed = 250;
    }
    if (this.game.currentPowerUp === "B") {
      this.game.bulletDamage = 20;
    } else {
      this.game.bulletDamage = 10;
    }







    if (this.game.running) {
      if (this.dead && this.game.lives > 0) {
          this.game.reset();
          return;

      } else if (this.dead && this.game.lives === 0) {
          this.game.running = false;
          return;
      }

      if (this.game.left === true) {
        this.animation = this.leftAnimation;
        this.facing = "left";
        if (this.xvel > 0) this.xvel = 0;
        this.xvel -=this.speed;
        if (this.xvel <= -this.maxSpeed) this.xvel = -this.maxSpeed;
      }
      if (this.game.right === true) {
        this.animation = this.rightAnimation;
        this.facing = "right";
        if (this.xvel < 0) this.xvel = 0;
        this.xvel += this.speed;
        if (this.xvel >= this.maxSpeed) this.xvel = this.maxSpeed;
      }
      if (this.game.up === true) {
        this.animation = this.upAnimation;
        this.xvel = 0;
      }
      if (this.game.down === true) {
        if (this.facing === "right") this.animation = this.crouchAnimation;
        if (this.facing === "left") this.animation = this.crouchLeftAnimation;
        this.xvel = 0;
      }
      if (this.game.toggle && this.changePowerUp) {
        this.powerUpindex = this.game.powerups.indexOf(this.game.currentPowerUp);
        if (this.game.powerups.length < 1 || this.game.currentPowerUp === this.game.powerups[this.game.powerups.length - 1]) {
            this.game.currentPowerUp = " ";
        } else {
            this.game.currentPowerUp = this.game.powerups[this.powerUpindex + 1];
        }
        this.changePowerUp = false;
      }
      if (!this.changePowerUp) {
        this.powerUpCooldown += this.game.clockTick;
        //console.log(this.powerUpCooldown);
        if (this.powerUpCooldown > 0.25) {
          this.changePowerUp = true;
          this.powerUpCooldown = 0;
        }
      }


        //console.log(this.changePowerUp);

    ///////////////////////////
      if (this.game.jump) {
        this.animation = this.jumpAnimation;
        if (!this.jumping && !this.falling) {
          AM.getAudioAsset("./js/sound/jump.wav").play();
          this.jumping = true;
          this.yvel = -600;
        }
      } else {
        if (this.game.jumping && this.yvel < 0) {
            //Is this code even reachable??
            this.yvel = 0;
            this.jumping = false;
            this.falling = true;
        }
      }
      if (this.game.fire && this.canShoot) {
        var dir = null;
        if (this.game.up) {
          dir = "up";
        } else {
          dir = this.facing;
        }
        var animationString = "";
        if (this.game.fire && this.canShoot) {
            var dir = null;
            if (this.game.up) {
                animationString = "./js/img/bullet-up.png";
                dir = "up";
            } else {
                dir = this.facing;
                if (dir === "left") {
                    console.log("facing left");
                    animationString = "./js/img/bullet-left.png";
                } else {
                    animationString = "./js/img/bullet.png";
                }
            }
        }

        var bullet = new Bullet(this.game, this.x + 74, this.y + 35, AM.getAsset(animationString), dir);
            // adjusting the bullet based on position
        this.game.addEntity(bullet);
        if(this.game.down === true) {
          bullet.y += 20;
        } else if(this.game.up === true) {
          bullet.x = this.x + 38;
          bullet.y = this.y - 45;
        }
        if(this.facing === "left" && !this.game.up) {
          bullet.x -= 70;
        }
        this.game.addEntity(bullet);
        this.laserSound.play();
        this.game.shotsFired += 1;
        this.canShoot = false;
      }
        if (!(this.game.jump || this.game.left || this.game.right || this.game.up || this.game.down)) {
            if (this.facing === "left") {
              this.animation = this.idleLeftAnimation;
          } else {
              this.animation = this.idleAnimation;
          }
          this.xvel = 0;
      }
      this.boundingRect = new BoundingRect(this.x, this.y, 80, 102);
      if (this.game.jump) {
        this.boundingRect.height = 60;
        this.boundingRect.bottom = this.boundingRect.y + 60;
      }




    if (this.jumping) {
        this.boundingRect = new BoundingRect(this.x, this.y, 70, 60);
        if (this.facing === "left") {
          this.animation = this.jumpLeftAnimation;
        } else {
          this.animation = this.jumpAnimation;
        }
        this.jumpTime += this.game.clockTick;
        this.yvel += this.jumpTime * 60;
        if (this.yvel > 700) this.yvel = 700;
            //if (!this.game.jump && this.yvel > 0) this.yvel = 0;

        for (var i = 0; i < this.game.platforms.length; i++) {
            var plat = this.game.platforms[i];
            if (this.collide(plat)) {
                if (this.collideBottom(plat)) {
                        //console.log("Bottom");
                        //this.game.currentPowerUp = temp;
                    this.jumping = false;
                    this.yvel = 0;
                    this.jumpTime = 0;
                    this.y = plat.boundingRect.top - 101;
                    if (this.game.currentPowerUp === "S" && this.facing === "right") {
                        this.x -= 3;
                    } else if (this.game.currentPowerUp === "S" && this.facing === "left") {
                        this.x += 3;
                    }
                }  else if (this.collideTop(plat) && this.facing === "right") {
                        //console.log("TOP");
                    this.yvel = 0;
                    this.x -= 2;
                    this.y = plat.boundingRect.bottom + 1;
                    this.yvel = 0;

                } else if (this.collideTop(plat) && this.facing === "left") {
                    this.yvel = 0;
                    this.x += 2;
                    this.y = plat.boundingRect.bottom + 1;
                } else if (this.collideRight(plat)) {
                    this.xvel = 0;
                    this.x -= 1;
                    //     this.yvel = 0;
                    //    this.y += 1;
                    //    this.yvel = -1;
                } else if (this.collideLeft(plat)) {
                    this.xvel = 0;
                    this.x += 1;
                      //   this.yvel = 0;
                     //    this.y += 5;
                 }

             }

         }
     } else if (this.falling) {
            //console.log("FALLING");
          if (this.facing === "left") {
            this.animation = this.jumpLeftAnimation;
          } else {
            this.animation = this.jumpAnimation;
          }
          this.fallTime += this.game.clockTick;
          this.yvel += this.fallTime * 60;
          if (this.yvel > 700) this.yvel = 700;
          for (var i = 0; i < this.game.platforms.length; i++) {
            var plat = this.game.platforms[i];
            if (this.collide(plat)) {
                if (this.collideBottom(plat)) {
                    this.falling = false;
                    this.yvel = 0;
                    this.fallTime = 0;
                    this.y = plat.boundingRect.top - 101;
                        //console.log("BOO");
                } else if (this.collideLeft(plat)) {
                    this.xvel = 0;
                    this.x += 1;
                } else if (this.collideRight(plat)) {
                    this.xvel = 0;
                    this.x -= 1;
                } else if (this.collideTop(plat)) {
                        //console.log("TOP");
                    this.yvel = 0;
                    this.y += 1;
                }
            }
          }
      } else {
            //this.falling = true;
          var land = false;
          var leftWall = false;
          var rightWall = false;
          for (var i = 0; i < this.game.platforms.length; i++) {
              var plat = this.game.platforms[i];

                // if (!this.collide(plat)) {
                //   this.falling = true;
                //   this.yvel = 100;
                // } else {
                //
                //   this.falling = false;
                //   this.yvel = 0;
                //   break;
                // }
                //  console.log(this.boundingRect.right, " ", plat.boundingRect.left);

                if (this.collide(plat)) {
                    //console.log("COLLIDE");
                    if (this.collideBottom(plat)) {   // if the current platform is being walked on, it can't be collided to the right/left at the same time
                        land = true;
                    if (plat.y < this.y + 100 && this.collideLeft(plat)) {
                          //console.log("stop");
                          this.xvel = 0;
                          this.x += 1;
                      } else if (plat.y < this.y + 100 && this.collideRight(plat)) {
                          this.xvel = 0;
                          this.x -= 1;
                          //console.log("collaborate and listen");
                      }
                        //console.log("BOTTOM COLLISION");
                    } else {      // otherwise we're walking on a different platform, and colliding right/left with this one
                    if (this.collideLeft(plat) && plat.boundingRect.top < this.boundingRect.bottom) {
                            //console.log("LEFT");

                            //leftWall = true;
                            this.xvel = 0;
                            this.x += 1;
                        } else if (this.collideRight(plat) && plat.boundingRect.top < this.boundingRect.bottom) {

                            //console.log("RIGHT");
                            //rightWall = true;
                            this.xvel = 0;
                            this.x -= 1;
                        }
                    }
                    //console.log("DONE");
                }

            }
            if (land) {
                this.falling = false;
                this.yvel = 0;
            } else {
                this.falling = true;
                this.yvel = 100;
            }
            //if (leftWall) {
            //  this.xvel = 0;
            //  this.x += 1;
            //}
            //if (rightWall) {
            //  this.xvel = 0;
            //  this.x -= 1;
            //}
        }
        /*
         * This loop checks if the player has touched any other entities except for himself.
         * If so, the bounding box disappears to represent the player taking damage/dying.
         * We will add this later.
         */
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var enemy = this.game.entities[i];
        //     if (this != enemy && this.collide(enemy)) {
        //         this.debug = false;
        //     }
        // }
        if (this.recoiling) {
          this.xvel += this.recoilX * 3;
          this.yvel += this.recoilY * 3;
        }
        // this.x += this.xvel * this.game.clockTick;
        // this.y += this.yvel * this.game.clockTick;
        if (!this.canShoot) {
          this.shotCooldown += this.game.clockTick;
          if (this.game.currentPowerUp === 'B') {
              if (this.shotCooldown > 0.85) {
                this.canShoot = true;
                this.shotCooldown = 0;
              }
          }
          else {
              if (this.shotCooldown > 0.45) {
                this.canShoot = true;
                this.shotCooldown = 0;
              }
          }
    }
    for (var i = 0; i < this.game.entities.length; i++) {
      var entity = this.game.entities[i];
      if (entity instanceof TreeBoss) {
         /*
         This kills the player instantly until we get knockback working!
         Doesnt show the end game screen!
         */
         if (entity.collide(this)) {
             this.damageSound.play();
             this.game.health = 0;
             this.game.percent = this.game.health / this.game.maxHealth;
             entity.collided = true;
         }
         if (this.game.health <= 0) {
            this.removeFromWorld = true;
            this.dead = true;
            this.reset();
         }
     }
     if (entity instanceof TreeBossAttack) {
         /*
         This kills the player instantly until we get knockback working!
         Doesnt show the end game screen!
         */
         if (entity.collide(this) && entity.canDamage) {
             this.damageSound.play();
             this.game.health -= 1;
             this.game.percent = this.game.health / this.game.maxHealth;
             entity.collided = true;
         }
         this.collideCounter++;
         if (this.collideCounter === this.collideTime) {
             this.collideCounter = 0;
         }
         if (this.game.health <= 0) {
            this.removeFromWorld = true;
            this.dead = true;
            this.reset();
         }
     }
     if (entity instanceof BirdEnemy || entity instanceof Dragon || entity instanceof CrazyCatEnemy) {
        //         //console.log("bullet: ", entity.x, ", ", "bird: ", this.x);

    if (entity.collide(this) && !this.invincible) {
      this.recoiling = true;
      this.invincible = true;
        if (this.collideLeft(entity) && !this.jumping) {
            this.hitEffect(entity);
            //this.xvel = 0;
            this.recoilX = 50;
            //if (this.game.left)
                //this.x += 125;

            //if (!this.game.left)
                //this.x += 75;
        } else if (this.collideRight(entity) && !this.jumping) {
                this.hitEffect(entity);
                console.log("collide right walking");
                //this.xvel = 0;
                this.recoilX = -50;
                //if (this.game.right)
                    //this.x -= 125;
                //if (!this.game.right)
                    //this.x -= 75;
        } else if (this.collideRight(entity) && this.jumping) {
                        this.hitEffect(entity);
                        console.log("collide right jumping");
                        this.recoilX = -50;
                  //       for (var k = 0; k < 120; k++) {
                  //        this.x -= 1;
                  //  }
         } else if (this.collideLeft(entity) && this.jumping) {
                this.hitEffect(entity);
                console.log("collide left jumping");
                     //this.ableToRight = false;
                     this.recoilX = 50;
                    //  for (var k = 0; k < 120; k++) {
                    //      this.x += 1;
                    // }
                   //      this.y += 1;
               } else if (this.collideBottom(entity)) {
                 this.hitEffect(entity);
                //this.y -= 150;
                //this.yvel = 0;
                this.recoilY = -50;
               // entity.removeFromWorld = true;
                console.log("collide bottom");

            }  else if (this.collideTop(entity)) {
                this.hitEffect(entity);
                //this.yvel = 0;
                      //  if(!this.platformCollision(this.y)
                        //this.y += 10;
                        this.recoilY = 50;
                        console.log("colliding top");
              //      this.y += 10;
          }
          if (this.game.health <= 0) {
            this.removeFromWorld = true;
            this.dead = true;
            this.reset();
        }
    }
}
        else if (entity instanceof PowerUp) {
            if (entity.collide(this)) {
                if (entity.boostType === "S") {
                        //console.log(this.game.powerups);
                      if (this.game.powerups.length <= 1) {
                          this.game.powerups.push("S");
                          this.game.currentPowerUp = "S";
                      } else {
                          var flag = true;
                          for (var i = 0; i < this.game.powerups.length; i++) {
                              if (this.game.powerups[i] === entity.boostType) {
                                  flag = false;
                              }
                          }
                          if (flag)
                              this.game.powerups.push(entity.boostType);
                      }
                            //console.log(this.game.powerups);
                      entity.removeFromWorld = true;
                      this.game.hasSpeed = true;
                        //}
        } else if (entity.boostType === "B") {
// <<<<<<< HEAD
                if (this.game.powerups.length === 1) {
                    this.game.powerups.push("B");
                    this.game.currentPowerUp = "B";
                } else {
                    var flag = true;
                    for (var i = 0; i < this.game.powerups.length; i++) {
                        if (this.game.powerups[i] === entity.boostType) {
                            flag = false;
// =======
                        // if (this.game.powerups.length <= 1) {
                        //     this.game.powerups.push("B");
                        //     this.game.currentPowerUp = "B";
                        // } else {
                        //     var flag = true;
                        //     for (var i = 0; i < this.game.powerups.length; i++) {
                        //       if (this.game.powerups[i] === entity.boostType) {
                        //         flag = false;
                        //       }
                        //     }
                        //     if (flag) {
                        //       this.game.powerups.push(entity.boostType);
                        //     }
                        //       entity.removeFromWorld = true;
                        //       this.game.hasBulletUpgrade = true;
//>>>>>>> e268857dbb6644a0d16093cc05f96e43dd795386
                        }
                    }
                    if (flag) {
                        this.game.powerups.push(entity.boostType);
                    }
                    entity.removeFromWorld = true;
                    this.game.hasBulletUpgrade = true;
                }
          }

                }
              } else if (entity instanceof HealthPack) {
                if (entity.collide(this)) {
                  console.log("collide health pack");
                  entity.removeFromWorld = true;
                  this.game.usedHealth = true;
                  if (this.game.health <= 60) {
                      this.game.health += 40;
                      this.game.percent = this.game.health / this.game.maxHealth;
                  } else {
                      this.game.health = 100;
                       this.game.percent = this.game.health / this.game.maxHealth;
                  }
                }
            }
        }

        Entity.prototype.update.call(this);
        this.game.camera.follow(this, 400, 175);
        this.game.camera.update();
    }
    // This is to fix a recoil bug.
    // Its not ideal, but its better than what was.
    //console.log("here");
    if (this.game.jump && this.recoiling) {
       this.yvel = 15;
       this.xvel = 0;
    }
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
}
PlayerOne.prototype.collide = function(other) {
    return (this.boundingRect.bottom >= other.boundingRect.top) &&
    (this.boundingRect.left <= other.boundingRect.right) &&
    (this.boundingRect.right >= other.boundingRect.left) &&
    (this.boundingRect.top <= other.boundingRect.bottom);
}
PlayerOne.prototype.collideTop = function(other) {

    return this.boundingRect.top <= other.boundingRect.bottom &&
    this.boundingRect.bottom >= other.boundingRect.bottom;
}
PlayerOne.prototype.collideLeft = function(other) {


    return this.boundingRect.left <= other.boundingRect.right &&
    this.boundingRect.right >= other.boundingRect.right;
}
PlayerOne.prototype.collideRight = function(other) {


    return this.boundingRect.right >= other.boundingRect.left &&
    this.boundingRect.left <= other.boundingRect.left;
}
PlayerOne.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
    this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}

PlayerOne.prototype.hitEffect = function(entity) {
    var entity = entity;
    this.damageSound.play();
    this.game.health -= entity.damage;
    this.game.percent = this.game.health / this.game.maxHealth;
}

// PlayerOne.prototype.platformCollision = function() {
//     for (var i = 0; i < this.game.platforms.length; i++) {
//         var plat = this.game.platforms[i];
//         if (this.collide(plat))
//             return true;
//         else return false;
//     }
// }
