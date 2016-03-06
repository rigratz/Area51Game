function PlayGame(game, x, y) {
    //console.log("Lets play game");
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
    this.is = ("PlayGame");
    this.bg = AM.getAsset("./js/img/mainscreen.png");
    this.removeFromWorld = false;
    Entity.call(this, game, x, y);
}

PlayGame.prototype = new Entity();
PlayGame.prototype.constructor = PlayGame;

PlayGame.prototype.reset = function () {
    this.game.running = false;
}
PlayGame.prototype.update = function () {
    if (this.game.click && this.game.lives > 0) {
       // console.log("Thanks for clicking! game is running = " + this.game.running);
        this.game.running = true;
        this.removeFromWorld = true;
    } else if (this.game.lives <= 0) {
     //   console.log("game over!");
      this.game.running = false;
    }
    Entity.prototype.update.call(this);
}

PlayGame.prototype.draw = function (ctx) {
    this.ctx.save();
    if (!this.game.running) {
        this.ctx.drawImage(this.bg, 0, 0, 800, 650, 0, 0, 800, 650);
        this.ctx.font = "  24pt Impact";
        this.ctx.fillStyle = "yellow";
        //if (this.game.mouse) { this.ctx.fillStyle = "white"; }
        if (this.game.lives > 0) {
            this.ctx.fillText("GoldOne presents...", 100, 100);
            if (this.game.mouse) { this.ctx.fillStyle = "white"; }
            this.ctx.fillText("Click to play the game!", 250, 600);
        }
        else {

            this.ctx.fillText("Oh no! The Aliens have won! Better luck next time!", 100, 200);
        }
    }
    this.ctx.restore();

}
