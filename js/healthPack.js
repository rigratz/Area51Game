function HealthPack(icon, game, x, y, w, h) {
    this.icon = icon;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.debug = true;
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
      this.ctx.drawImage(this.icon,
          0, 0,  // source from sheet
          50, 50,
          this.x, this.y ,
          this.width,
          this.height);
     var bb = this.boundingRect;
    if (this.debug) {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(bb.x, bb.y, bb.width, bb.height);
    }


}

HealthPack.prototype.collide = function(other) {
    return (this.boundingRect.bottom > other.boundingRect.top) &&
        (this.boundingRect.left < other.boundingRect.right) &&
        (this.boundingRect.right > other.boundingRect.left) &&
        (this.boundingRect.top < other.boundingRect.bottom);
}