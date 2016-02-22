function PowerUp(boostSheet, game, x, y, w, h, type) {
    this.boostSheet = boostSheet;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.debug = true;
    this.boostType = type;
    this.boundingRect = new BoundingRect(x, y, w, h);
    this.game = game;
    this.collided = true;
    Entity.call(this, game, this.x, this.y);
}

PowerUp.prototype = new Entity();
PowerUp.prototype.constructor = PowerUp;

PowerUp.prototype.update = function() {
    if (!this.game.running) return;

}

PowerUp.prototype.reset = function () {
    this.startX = this.x;
    this.startY = this.y;
}


PowerUp.prototype.draw = function (ctx) {
    // ctx.strokeStyle = "yellow";
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    if (!this.game.running) return;
    if (this.boostType === "S") {
      this.ctx.drawImage(this.boostSheet,
          0, 0,  // source from sheet
          50, 50,
          this.x, this.y ,
          this.width,
          this.height);
    } 
}

PowerUp.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}