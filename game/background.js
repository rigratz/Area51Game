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
    console.log("Drawing background");
    ctx.drawImage(this.backgroundImage, 0, 0);
}
