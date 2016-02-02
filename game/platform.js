function Platform(game, x, y, w, h) {
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.debug = true;
    this.boundingRect = new BoundingRect(x, y, w, h);
    Entity.call(this, game, this.x, this.y);
}



Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
}


Platform.prototype.draw = function (ctx) {
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    Entity.prototype.draw.call(this);

}
