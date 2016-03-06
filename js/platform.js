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
    if (this.platType === "B") {
      ctx.drawImage(this.textureSheet,
          0, 300,  // source from sheet
          50, 50,
          this.x, this.y,
          50,
          50);


      return;
    }
    var topx = 0;
    var topy = 0;
    var bottomx = 0;
    var bottomy = 0;
    if (this.game.currentWorld.name === "Area 51") {
      topx = 0; topy = 0;
      bottomx = 100; bottomy = 0;
    } else if (this.game.currentWorld.name === "World 1") {
      topx = 0; topy = 100;
      bottomx = 200; bottomy = 100;
    } else if (this.game.currentWorld.name === "World 2") {
      topx = 0; topy = 400;
      bottomx = 100; bottomy = 400;
    }
    // if (this.platType === "T") {
    //   ctx.drawImage(this.textureSheet,
    //       0, 0,  // source from sheet
    //       50, 50,
    //       this.x, this.y ,
    //       this.width,
    //       this.height);
    // } else if (this.platType === "X"){
    var mult = this.height / 50;
    var i = 0;
    var y = this.y;
    for (i = 1; i <= mult; i++) {
      ctx.drawImage(this.textureSheet,
          bottomx, bottomy,  // source from sheet
          50, 50,
          this.x, this.y,
          50,
          50);
          this.y += 50;
    }
    this.y = y;
    ctx.drawImage(this.textureSheet,
          topx, topy,  // source from sheet
          50, 50,
          this.x, this.y ,
          50,
          50);
}
