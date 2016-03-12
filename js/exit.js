function Exit(textureSheet, game, x, y, w, h, type, exitDir) {
    this.textureSheet = textureSheet;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.removeFromWorld = false;
    this.debug = false;
    this.type = type;
    this.exitDir = exitDir;
    this.boundingRect = new BoundingRect(x, y, w, h);
    Entity.call(this, game, this.x, this.y);
}

Exit.prototype = new Entity();
Exit.prototype.constructor = Exit;

Exit.prototype.update = function() {

}
Exit.prototype.draw = function (ctx) {
}

function Portal(textureSheet, game, x, y, w, h, type, portalTo) {
    this.textureSheet = textureSheet;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.animationCounter = 0;
    this.portalTo = portalTo;
    this.removeFromWorld = false;
    this.debug = true;
    this.type = type;
    this.boundingRect = new BoundingRect(x, y, w, h);
    Entity.call(this, game, this.x, this.y);
}

Portal.prototype = new Entity();
Portal.prototype.constructor = Exit;

Portal.prototype.update = function() {

}
Portal.prototype.draw = function (ctx) {
    this.animationCounter++;
    if (this.animationCounter < 10) {
        ctx.drawImage(this.textureSheet,
            0, 200,
            this.width, this.height,
            this.x, this.y,
            50, 50);
    }
    else if (this.animationCounter < 20) {
        ctx.drawImage(this.textureSheet,
            100, 200,
            this.width, this.height,
            this.x, this.y,
            50, 50);
    }
    else if (this.animationCounter < 25) {
        ctx.drawImage(this.textureSheet,
            200, 200,
            this.width, this.height,
            this.x, this.y,
            50, 50);
    }
    else {
        this.animationCounter = 0;
    }
}
