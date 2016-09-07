/*
  Background handles the drawing of background images within the game's levels.
*/
function Background(backgroundImage, game, w, h) {
    this.backgroundImage = backgroundImage;
    this.ctx = game.ctx;
    this.width = w;
    this.height = h;
}

Background.prototype.constructor = Background;

Background.prototype.update = function() {
}

/*
  draw creates a tiled drawing using a background image to accomodate for
  rooms or levels that may be larger than the image itself.
*/
Background.prototype.draw = function (ctx) {
    /*Draws tiles of the background image*/
    for (var i = 0; i <= 4; i += 1) {
      for (var j = 0; j <= 4; j+= 1) {
        ctx.drawImage(this.backgroundImage, i*this.width, j*this.height);
      }
    }
}
