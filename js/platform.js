function Platform(textureSheet, game, x, y, w, h, type) {
    this.textureSheet = textureSheet;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.debug = true;
    this.removeFromWorld = false;
    this.platType = type;
    this.boundingRect = new BoundingRect(x, y, w, h);
    this.game = game;
    Entity.call(this, game, this.x, this.y);
}

Platform.prototype = new Entity();
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
    if (!this.game.running) return;

}

Platform.prototype.reset = function () {
    this.startX = this.x;
    this.startY = this.y;
}


Platform.prototype.draw = function (ctx) {

    if (this.platType === "T") {
      ctx.drawImage(this.textureSheet,
          0, 0,  // source from sheet
          50, 50,
          this.x, this.y ,
          this.width,
          this.height);
    } else if (this.platType === "X"){


      var mult = this.height / 50;
      var i = 0;
      var y = this.y;
      for (i = 1; i <= mult; i++) {
        ctx.drawImage(this.textureSheet,
          102, 4,  // source from sheet
          50, 50,
          this.x, this.y,
          50,
          50);
          this.y += 50;
      }
      this.y = y;
      ctx.drawImage(this.textureSheet,
          0, 0,  // source from sheet
          50, 50,
          this.x, this.y ,
          50,
          50);
    }
}
