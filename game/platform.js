function Platform(textureSheet, game, x, y, w, h) {
    this.textureSheet = textureSheet;
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
    // ctx.strokeStyle = "yellow";
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.textureSheet,
        0, 0,  // source from sheet
        50, 50,
        this.x, this.y,
        this.width,
        this.height);
    Entity.prototype.draw.call(this);

}
