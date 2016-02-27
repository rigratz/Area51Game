function HealthPack(game, x, y, w, h) {
   // this.boostSheet = boostSheet;
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
}

HealthPack.prototype = new Entity();
HealthPack.prototype.constructor = HealthPack;

HealthPack.prototype.update = function() {
    if (!this.game.running) return;
}

HealthPack.prototype.reset = function () {
    this.startX = this.x;
    this.startY = this.y;
}


HealthPack.prototype.draw = function (ctx) {
    if (!this.game.running) return;
    this.ctx.strokeStyle = "pink";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore();
    //if (this.boostType === "S") {
      // this.ctx.drawImage(this.boostSheet,
      //     0, 0,  // source from sheet
      //     50, 50,
      //     this.x, this.y ,
      //     this.width,
      //     this.height);
    //}
}

HealthPack.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}