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
    /*Draws tiles of the background image*/
    for (var i = 0; i <= 2; i += 1) {
        ctx.drawImage(this.backgroundImage, i*this.width, 0);
        ctx.drawImage(this.backgroundImage, i * this.width, this.height);
    }
}
