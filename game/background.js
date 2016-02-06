function Background(backgroundImage, game, w, h) {
    this.backgroundImage = backgroundImage;
    this.ctx = game.ctx;
    this.width = w;
    this.height = h;
}

Background.prototype.constructor = Background;

Background.prototype.update = function() {
}


Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.backgroundImage, 0, 0);
    ctx.drawImage(this.backgroundImage, 0, 736);
    ctx.drawImage(this.backgroundImage, 736, 0);
    ctx.drawImage(this.backgroundImage, 736, 736);
    ctx.drawImage(this.backgroundImage, 736*2, 0);
    ctx.drawImage(this.backgroundImage, 736*2, 736);
}
