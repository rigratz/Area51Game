function Health(icon, game, x, y, w, h) {
    this.icon = icon;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.debug = false;
   // this.boostType = type;
    this.boundingRect = new BoundingRect(x, y, w, h);
    this.game = game;
    this.collided = true;
    Entity.call(this, game, this.x, this.y);
    this.falling = true;
}

Health.prototype = new Entity();
Health.prototype.constructor = Health;

Health.prototype.update = function() {
    if (!this.game.running) return;

    // if (this.falling) {
    //   this.yvel += 10;
    // }
    // for (var i = 0; i < this.game.platforms.length; i ++) {
    //     if (this.collide(this.game.platforms[i])) {
    //       if (this.collideBottom(this.game.platforms[i])) {
    //         this.yvel = 0;
    //         this.y = this.game.platforms[i].y - (this.boundingRect.bottom - this.y + 1);
    //         this.falling = false;
    //       } else {
     
    //       }
    //     } else {                                          //THIS COMMENTED CODE IS TO TRY AND GET THE HEALTH TO FALL FROM THE ENEMEY RATHER THAN STAY PUT
    //       this.falling = true;
    //     }
    // }
    // this.y += this.yvel * this.game.clockTick;
    for (var j = 0; j < this.game.entities.length; j++) {
        var entity = this.game.entities[j];
            if (entity instanceof PlayerOne) {
                if (entity.collide(this)) {
                  this.removeFromWorld = true;
                  if (this.game.health < this.game.maxHealth - 30) {
                  this.game.health += 30;
                } else {
                  this.game.health = this.game.maxHealth;
                }
                this.game.percent = this.game.health / this.game.maxHealth;
                }
            }
        
    }
}

Health.prototype.reset = function () {
    this.startX = this.x;
    this.startY = this.y;
}


Health.prototype.draw = function (ctx) {
    if (!this.game.running) return;
      this.ctx.drawImage(this.icon,
          0, 0,  // source from sheet
          25, 25,
          this.x, this.y ,
          this.width,
          this.height);
     var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }

}

Health.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}

Health.prototype.collideBottom = function(other) {


    return this.boundingRect.bottom >= other.boundingRect.top &&
        this.boundingRect.top <= other.boundingRect.top &&
        this.boundingRect.bottom <= other.boundingRect.bottom;  // added this line because if the character's bottom
    // is less than the platform bottom then we know he is standing on the platform. otherwise collisions are still detected
    // even when he is just standing next to the platform
}