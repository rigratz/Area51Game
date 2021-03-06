/*
  The bullet object is used for projectile attacks fired by either the player
  or select enemy types in the game. It handles the speed, damage, and
  appearance of the projectile.
*/
function Bullet(game, x, y, spritesheet, dir) {//, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 500;
    this.width = 10;
    this.height = 10;
    this.xvel = 0;
    this.yvel = 0;
    this.startX = x;
    this.startY = y;
    this.spritesheet = spritesheet;
    this.rightAnimation = new Animation("bullet", spritesheet, 258, 108, 0.40, 1, true, false);
    this.leftAnimation = new Animation("bullet", spritesheet, 258, 108, 0.40, 1, true, false);
    this.upAnimation = new Animation("bullet", spritesheet, 108, 258, 0.40, 1, true, false, "up");
    this.animation = this.rightAnimation;
    this.flameAnimation = new Animation("flame", spritesheet, 137, 285, 0.15, 2, true, false);
    this.debug = false;
    this.dir = dir;
    if(this.game.currentPowerUp === 'B') {
        var speed = 300;
        this.damage = 30;
    }
    else if(this.game.currentPowerUp === 'R') {
        var speed = 300;
    }
    else {
        var speed = 1000;
    }

    this.distanceTraveled = 0;
    if (dir === "up") {
        this.yvel = -speed;
    } else if (dir === "left") {
        this.xvel = -speed;
    } else if (dir === "right") {
        this.xvel = speed;
    } else if(this.dir === "snail") {
        this.xvel = 800;
    } else if(this.dir === "snail_left") {
        this.xvel = -800;
    }



    if(this.dir === "dragon") {
        this.xvel = 0;
        this.yvel = 250;
        this.boundingRect = new BoundingRect(x+20, y+40, 25, 100);
    } else {
        this.boundingRect = new BoundingRect(x, y, 10, 10);
    }
    //this.debug = true;

    Entity.call(this, game, this.x, this.y);

}

Bullet.prototype = new Entity();
Bullet.prototype.constructor = Bullet;

/*
  update function updates the state of the Bullet projectile as it travels
  across the screen. It determines if it hits a player, enemy, wall, or has
  traveled further than it is allowed to.
*/
Bullet.prototype.update = function() {
    this.x += this.xvel * this.game.clockTick;
    this.y += this.yvel * this.game.clockTick;
    this.distanceTraveled = (this.x - this.startX) + (this.y - this.startY);
    if (Math.abs(this.distanceTraveled) > 650) this.removeFromWorld = true;


    if(this.dir === "up") {
        this.animation = this.upAnimation;
    } else if (this.dir === "left") {
        this.animation = this.leftAnimation;
    } else if (this.dir === "right") {
        this.animation = this.rightAnimation;
    }

    for (var i = 0; i < this.game.platforms.length; i++) {
        if (this.collideEnemy(this.game.platforms[i])) {
            this.removeFromWorld = true;
            break;
        }
    }
    if (this.dir === "dragon") {
      this.boundingRect = new BoundingRect(this.x+20, this.y+40, 25, 100);
    }
Entity.prototype.update.call(this);
}

/*
  draw function displays the image of the projectile as it travels across the
  screen.
*/
Bullet.prototype.draw = function () {
    if(this.dir === "snail" || this.dir === "snail_left") {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = "turquoise";
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.restore();
    } else if(this.dir === "dragon") {
      this.flameAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    } else if(this.dir != "dragon") {
        if(this.game.currentPowerUp === "B") {
            this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            Entity.prototype.draw.call(this);
        } else {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = "orange";
            this.ctx.fill();
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "red";
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(this.boundingRect.x, this.boundingRect.y, this.boundingRect.width, this.boundingRect.height);
    }
Entity.prototype.draw.call(this);

}

/*
  Collision function to determine if a Bullet has collided with an enemy entity.
*/
Bullet.prototype.collideEnemy = function(other) {
  if (other instanceof AlienBoss && this.dir != "dragon") {
    return ((this.x <= other.leftEye.right) &&
        (this.x > other.leftEye.left) &&
        (this.y > (other.leftEye.top) && (this.y < other.leftEye.bottom))) ||
        ((this.x <= other.rightEye.right) &&
            (this.x > other.rightEye.left) &&
            (this.y > (other.rightEye.top) && (this.y < other.rightEye.bottom)));
  } else if (other instanceof AlienBoss && this.dir === "dragon") {
    //IGNORE IT
  }else {
    return (this.x <= other.boundingRect.right) &&
        (this.x > other.boundingRect.left) &&
        (this.y > (other.boundingRect.top) && (this.y < other.boundingRect.bottom));
  }
}

/*
  Collision function specifically for the flame projectile.
*/
Bullet.prototype.flameCollidePlayer = function(other) {
    return (this.boundingRect.bottom >= other.boundingRect.top) &&
    (this.boundingRect.left <= other.boundingRect.right) &&
    (this.boundingRect.right >= other.boundingRect.left) &&
    (this.boundingRect.top <= other.boundingRect.bottom);
}
