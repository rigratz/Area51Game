function Exit(textureSheet, game, x, y, w, h, type, exitDir) {
    this.textureSheet = textureSheet;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.removeFromWorld = false;
    this.debug = true;
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
    this.portalTo = portalTo;
    this.removeFromWorld = false;
    this.debug = true;
    this.type = type;
    this.exitDir = exitDir;
    this.boundingRect = new BoundingRect(x, y, w, h);
    Entity.call(this, game, this.x, this.y);
}

Portal.prototype = new Entity();
Portal.prototype.constructor = Exit;

Portal.prototype.update = function() {

}
Exit.prototype.draw = function (ctx) {
}
