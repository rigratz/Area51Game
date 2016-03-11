function PlayerOne(game, x, y, spritesheet) {
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

    this.jumpCount = 0;

    this.invincible = false;
    this.invincibilityTime = 0;


    this.powerups = [];
    this.currentPowerup = null;
    this.removeFromWorld = false;
    if (this.game.powerups[0] != " ")
        this.game.powerups.push(" ");
    this.currentPowerUp = " ";

    this.scale = 1;


    this.boundingRect = new BoundingRect(x, y, 90, 124);
    this.debug = true;

    this.falling = false;
    this.fallTime = 0;

    this.jumping = false;
    this.jumpHeight = 300;
    this.jumpTime = 0;
    this.totalJump = 2;

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

    this.scale = 1;

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

    this.jumpCount = 0;

    this.speed = 10;
    this.maxSpeed = 250;

    this.canShoot = true;
    this.shotCooldown = 0;

    this.changePowerUp = true;
    this.powerUpindex = 0;
    this.powerUpCooldown = 0;

    /*For use with TreeBossAttack*/
    this.collideTime = 100;
    this.collideCounter = 0;
    /*****************************/

    this.game.health = 100;
    this.game.percent = this.game.health / this.game.maxHealth;
    this.game.lives--;
    if (this.game.lives <= 0) {
        this.game.running = false;
        this.dead = true;
        this.game.playGame.reset();
    }
    this.dead = false;
    this.facing = "right";

    this.moveState = 0;
    this.animation = this.idleAnimation;

    //this.game.camera.follow(this, 400, 325);
    this.game.camera.update();
}
PlayerOne.prototype.draw = function () {
    if (this.dead || !this.game.running) return;
    var rand = Math.random();
    if (this.game.currentPowerUp === "T") {
      this.scale = .5;
    } else {
      this.scale = 1;
    }
    if (this.invincible && rand < .5) {
      return;
    } else {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.scale);
    }
    var bb = this.boundingRect;

    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }
    Entity.prototype.draw.call(this);
}

PlayerOne.prototype.update = function() {
  console.log(this.game.currentPowerUp);
    if (this.recoiling) {
          this.recoilTime += this.game.clockTick;
          if (this.recoilTime >= 0.20) {
                //console.log ("STOP RECOILING");
                this.recoiling = false;
                this.recoilTime = 0;
          }
    }
    if (this.invincible) {
          this.invincibilityTime += this.game.clockTick;
          if (this.invincibilityTime >= 1) {
                this.invincible = false;
                this.invincibilityTime = 0;
          }
    }
    this.game.camera.follow(this, 400, 325);
    //var collideExit = false;
    for (var i = 0; i < this.game.exits.length; i++) {
          if (this.collide(this.game.exits[i])) {
                //collideExit = true;
                if (this.game.exits[i].type === "exit") {
                      this.game.switchLevel(this.game.exits[i].exitDir, this.game.currentWorld.currentRoom.iIndex, this.game.currentWorld.currentRoom.jIndex);
                } else if (this.game.exits[i].type = "portal") {
                      //console.log("TELEPORT");
                      this.game.switchWorlds(this.game.currentWorld.name, this.game.exits[i].portalTo);
                }
                break;
              }
    }
    if (this.game.currentPowerUp === "S") {
          this.speed = 100;
          this.maxSpeed = 550;
    }
    else {
          this.speed = 10;
          this.maxSpeed = 250;
    }
    if (this.game.currentPowerUp === "B") {
          this.game.bulletDamage = 20;
    }
    else if (this.game.currentPowerUp === "R") {
          this.game.bulletDamage = 5;
    } else {
      this.game.bulletDamage = 10;
    }

    if (this.game.currentPowerUp === "T") {
         this.canShoot = false;
         this.game.jump = false;
    }
    if (this.game.currentPowerUp === "T") {
         for (var i = 0; i < this.game.platforms.length; i++) {
             var plat = this.game.platforms[i];
          //   console.log(plat.boundingRect.bottom);
          //   console.log(this.boundingRect.top);
             if (plat.boundingRect.bottom < this.boundingRect.top) {
               if (this.boundingRect.top - 8  <= plat.boundingRect.bottom) {
                            console.log(plat.boundingRect.bottom);
            console.log(this.boundingRect.top);
              //    this.boundingRect.bottom >= plat.boundingRect.bottom) {
                    console.log("im colling!!!");
                  //  this.changePowerUp = false;
              }
            }
         }
    } 

    /***************************************
    This if statement ends on line 656!!
    ****************************************/
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
          if (this.game.down === true) {
                if (this.facing === "right") this.animation = this.crouchAnimation;
                if (this.facing === "left") this.animation = this.crouchLeftAnimation;
                this.xvel = 0;
          }
          if (this.game.up === true) {
                this.animation = this.upAnimation;
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
                if (this.powerUpCooldown > 0.25) {
                      this.changePowerUp = true;
                      this.powerUpCooldown = 0;
                }
          }
          if (this.game.jump) {
                this.animation = this.jumpAnimation;
                if (!this.jumping && !this.falling) {
                      AM.getAudioAsset("./js/sound/jump.wav").play();
                      this.jumping = true;
                      this.yvel = -600;
                }

          }
          else {
                if (this.game.jumping && this.yvel < 0) {
                    //Is this code even reachable??
                    this.yvel = 0;
                    //console.log("faliing");
                    this.jumping = false;
                    this.falling = true;

                }
          }
          if (this.game.fire && this.canShoot) {
                var dir = null;
                if (this.game.up) {
                    dir = "up";
                }
                else {
                    dir = this.facing;
                }
                var animationString = "";
                if (this.game.fire && this.canShoot) {
                        var dir = null;
                        if (this.game.up) {
                                animationString = "./js/img/bullet-up.png";
                                dir = "up";
                        }
                        else {
                            dir = this.facing;
                            if (dir === "left") {
                                //console.log("facing left");
                                animationString = "./js/img/bullet-left.png";
                            }
                            else {
                                animationString = "./js/img/bullet.png";
                            }
                        }
                }

                var bullet = new Bullet(this.game, this.x + 74, this.y + 35, AM.getAsset(animationString), dir);
                var bullet1 = new Bullet(this.game, this.x + 74, this.y + 35, AM.getAsset(animationString), dir);
                var bullet2 =  new Bullet(this.game, this.x + 74, this.y + 35, AM.getAsset(animationString), dir);
                if (this.game.up === true) {
                      if (this.game.currentPowerUp === "R") {
                             bullet1.x = this.x + 38;
                             bullet1.y = this.y - 45;
                             bullet2.x = this.x + 38;
                             bullet2.y = this.y - 45;
                             bullet1.xvel = -120;
                             bullet2.xvel = 120;
                      }
                      bullet.x = this.x + 38;
                      bullet.y = this.y - 45;
                      if (this.game.currentPowerUp === "B") {
                          bullet.x = this.x + 70;
                      }
              } else if (this.game.down === true) {
                    if (this.game.currentPowerUp === "R") {
                          bullet1.y += 20;
                          bullet2.y += 20;
                          bullet1.yvel = -120;
                          bullet2.yvel = 120;
                    }
                    else {
                        if (this.game.right) {
                            bullet.xvel = 1000;
                        }
                        else if (this.game.left) {
                            bullet.xvel = -1000;
                        }
                    }
                   bullet.y += 20;
                }
                if (this.facing === "left"  && !this.game.up) {
                    if (this.game.currentPowerUp === "R") {
                          bullet1.x -= 70;
                          bullet2.x -= 70;
                          bullet1.yvel = -120;
                          bullet2.yvel = 120;
                    }
                    bullet.x -= 70;
                }
                if (this.facing === "right"  && !this.game.up) {
                    bullet1.yvel = -120;
                    bullet2.yvel = 120;
                }
                this.game.addEntity(bullet);
                if (this.game.currentPowerUp === "R") {
                      this.game.addEntity(bullet1);
                      this.game.addEntity(bullet2);
                }
                this.laserSound.play();
                this.game.shotsFired += 1;
                this.canShoot = false;
        }

          if (!(this.game.jump || this.game.left || this.game.right || this.game.up || this.game.down)) {
              if (this.facing === "left") {
                  this.animation = this.idleLeftAnimation;
              }
              else {
                  this.animation = this.idleAnimation;
              }
              this.xvel = 0;
          }
          if (this.game.currentPowerUp === "T") {
            this.boundingRect = new BoundingRect(this.x, this.y + 60, 80 * this.scale, 102 * this.scale + 15);
          } else {
          this.boundingRect = new BoundingRect(this.x, this.y, 90, 124);
        }
          if (this.game.jump) {
              this.boundingRect.height = 60;
              this.boundingRect.bottom = this.boundingRect.y + 60;
          }
          if (this.jumping) {
                //this.boundingRect = new BoundingRect(this.x, this.y, 70, 60);
                this.boudingRect = new BoundingRect(this.x, this.y, 70, 124);
                if (this.facing === "left") {
                    this.animation = this.jumpLeftAnimation;
                } else {
                    this.animation = this.jumpAnimation;
                }
                this.jumpTime += this.game.clockTick;
                this.yvel += this.jumpTime * 60;
             //   console.log("before doublde jump");
                if (this.yvel > 0 && this.game.jump) {
                  console.log("before doublde jump");
                  console.log(this.jumpCount);
                  if (this.jumpCount < 1 && this.game.currentPowerUp === "J") {
                      this.jumpCount++;
                      console.log("here!");
                      this.jumping = false;
                      this.jumpTime = 0;
                      this.yvel = 0;
                  }
                }
                if (this.yvel > 700) this.yvel = 700;
                for (var i = 0; i < this.game.platforms.length; i++) {
                    var plat = this.game.platforms[i];
                    if (this.collide(plat)) {
                        if (this.collideBottom(plat)) {
                          this.jumpCount = 0;
                                this.jumping = false;
                                this.yvel = 0;
                                this.jumpTime = 0;
                                this.y = plat.boundingRect.top - 101;
                                if (this.game.currentPowerUp === "S" && this.facing === "right") {
                                    this.x -= 3;
                                } else if (this.game.currentPowerUp === "S" && this.facing === "left") {
                                    this.x += 3;
                                }
                        } else if (this.collideTop(plat) && this.facing === "right") {
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
                        } else if (this.collideLeft(plat)) {
                            this.xvel = 0;
                            this.x += 1;
                        } else if (this.collideRight(plat)) {
                            this.xvel = 0;
                            this.x -= 1;
                        } else if (this.collideTop(plat)) {
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
                                  this.xvel = 0;
                                  this.x += 1;
                            } else if (plat.y < this.y + 100 && this.collideRight(plat)) {
                                  this.xvel = 0;
                                  this.x -= 1;
                            }
                        }
                        else {      // otherwise we're walking on a different platform, and colliding right/left with this one
                            if (this.collideLeft(plat) && plat.boundingRect.top < this.boundingRect.bottom) {
                                    this.xvel = 0;
                                    this.x += 1;
                            } else if (this.collideRight(plat) && plat.boundingRect.top < this.boundingRect.bottom) {
                                    this.xvel = 0;
                                    this.x -= 1;
                            }
                        }
                    }
                }
                if (land) {
                    this.falling = false;
                    this.yvel = 0;
                } else {
                    this.falling = true;
                    this.yvel = 100;
                }
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
                      if (this.shotCooldown > 0.9) {
                          this.canShoot = true;
                          this.shotCooldown = 0;
                      }
                  } else if (this.game.currentPowerUp === "F") {
                      if (this.shotCooldown > 0.2) {
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
            if(entity instanceof Bullet && (entity.dir === "snail" || entity.dir === "snail_left")) {
                if(entity.collideEnemy(this)) {
                    this.game.health -= 0.5;
                    this.damageSound.play();
                    this.game.percent = this.game.health / this.game.maxHealth;
                    entity.removeFromWorld = true;
                }
            } else if(entity instanceof Bullet && entity.dir === "dragon") {
                if(entity.flameCollidePlayer(this) && !this.invincible) {
                    console.log("hit player!");
                    //entity.removeFromWorld = true;
                    this.game.health -= 0.5;
                    this.damageSound.play();
                    this.game.percent = this.game.health / this.game.maxHealth;
                    this.invincible = true;
                   // entity.removeFromWorld = true;

                }
            }
              if (entity instanceof TreeBossAttack) {
                  if (entity.collide(this) && entity.canDamage) {
                      this.damageSound.play();
                      this.game.health -= 0.5;
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
             if (entity instanceof BirdEnemy || entity instanceof Dragon || entity instanceof CrazyCatEnemy || entity instanceof TreeBoss || entity instanceof ShadowEnemy || entity instanceof EyeBoss ||
             entity instanceof SnakeEnemy || entity instanceof SnailEnemy) {
                    if (entity.collide(this) && !this.invincible) {
                          this.recoiling = true;
                          this.invincible = true;
                          if (this.collideLeft(entity) && !this.jumping) {
                              this.hitEffect(entity);
                              if (entity instanceof EyeBoss) {
                                  this.recoilX = 50;
                              }
                              else {
                                  this.recoilX = 50;
                              }
                          } else if (this.collideLeft(entity) && this.jumping) {
                                    this.hitEffect(entity);
                                    if (entity instanceof EyeBoss) {
                                        this.recoilX = 50;
                                    }
                                    else {
                                        this.recoilX = 50;
                                    }
                                    console.log("collide left jumping");
                          } else if (this.collideRight(entity) && !this.jumping) {
                                    this.hitEffect(entity);
                                    console.log("collide right walking");
                                    if (entity instanceof TreeBoss) {
                                        this.recoilX = -1000;
                                    } else {
                                        this.recoilX = -50;
                                    }
                          } else if (this.collideRight(entity) && this.jumping) {
                                    this.hitEffect(entity);
                                    console.log("collide right jumping");
                                    if (entity instanceof TreeBoss) {
                                        this.recoilX = -1000;
                                    }
                                    else {
                                        this.recoilX = -50;
                                    }
                          } else if (this.collideBottom(entity)) {
                                     this.hitEffect(entity);
                                     //this.recoilY = -50;
                                     console.log("collide bottom");
                          }  else if (this.collideTop(entity)) {
                                     this.hitEffect(entity);
                                     //this.recoilY = 50;
                                     console.log("colliding top");
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
                          entity.removeFromWorld = true;
                          this.game.hasSpeed = true;

                    } else if (entity.boostType === "B") {
                            if (this.game.powerups.length === 1) {
                                    this.game.powerups.push("B");
                                    this.game.currentPowerUp = "B";
                            }
                            else {
                                var flag = true;
                                for (var i = 0; i < this.game.powerups.length; i++) {
                                    if (this.game.powerups[i] === entity.boostType) {
                                        flag = false;
                                    }
                                }
                                if (flag) {
                                    this.game.powerups.push(entity.boostType);
                                }
                                entity.removeFromWorld = true;
                                this.game.hasBulletUpgrade = true;
                            }
                     } else if (entity.boostType === "R") {
                          if (this.game.powerups.length === 1) {
                             this.game.powerups.push("R");
                             this.game.currentPowerUp = "R";
                           } else {
                           var flag = true;
                           for (var i = 0; i < this.game.powerups.length; i++) {
                           if (this.game.powerups[i] === entity.boostType) {
                              flag = false;
                          }
                        }
                        if (flag) {
                          this.game.powerups.push(entity.boostType);
                       }
                    entity.removeFromWorld = true;
                    this.game.hasShotgun = true;


               }

            } else if (entity.boostType === "J") {
                          if (this.game.powerups.length === 1) {
                             this.game.powerups.push("J");
                             this.game.currentPowerUp = "J";
                           } else {
                           var flag = true;
                           for (var i = 0; i < this.game.powerups.length; i++) {
                           if (this.game.powerups[i] === entity.boostType) {
                              flag = false;
                          }
                        }
                        if (flag) {
                          this.game.powerups.push(entity.boostType);
                       }
                    entity.removeFromWorld = true;
                    this.game.hasDoubleJump = true;


               }

            }  else if (entity.boostType === "T") {
                            if (this.game.powerups.length === 1) {
                                    this.game.powerups.push("T");
                                    this.game.currentPowerUp = "T";
                            }
                            else {
                                var flag = true;
                                for (var i = 0; i < this.game.powerups.length; i++) {
                                    if (this.game.powerups[i] === entity.boostType) {
                                        flag = false;
                                    }
                                }
                                if (flag) {
                                    this.game.powerups.push(entity.boostType);
                                }
                                entity.removeFromWorld = true;
                                this.game.hasShrink = true;
                            }
            }   else if (entity.boostType === "F") {
                            if (this.game.powerups.length === 1) {
                                    this.game.powerups.push("F");
                                    this.game.currentPowerUp = "F";
                            }
                            else {
                                var flag = true;
                                for (var i = 0; i < this.game.powerups.length; i++) {
                                    if (this.game.powerups[i] === entity.boostType) {
                                        flag = false;
                                    }
                                }
                                if (flag) {
                                    this.game.powerups.push(entity.boostType);
                                }
                                entity.removeFromWorld = true;
                                this.game.hasRapidFire = true;
                            }
                     }
          }
       }
            else if (entity instanceof HealthPack) {
                if (entity.collide(this)) {
                    //console.log("collide health pack");
                    entity.removeFromWorld = true;
                    //this.game.usedHealth = true;
                    this.game.maxHealth += 10;
                    this.game.health = this.game.maxHealth;
                    this.game.hasHealthUp[entity.char] = true;
                }
            }
        }
        Entity.prototype.update.call(this);
        //this.game.camera.follow(this, 400, 325);
        this.game.camera.update();
    /*************************************************************
    This is is the end of the if statement starting at line 230!!!
    **************************************************************/
    }

    // This is to fix a recoil bug.
    // Its not ideal, but its better than what was.
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
