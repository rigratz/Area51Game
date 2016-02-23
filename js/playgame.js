function PlayGame(game, x, y) {
    this.game = game;
    this.ctx = game.ctx;
    this.x = x;
    this.y = y;
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
         console.log("Thanks for clicking! game is running = " + this.game.running);
        //console.log(this.game.lives);
    } else if (this.game.lives <= 0) {
        console.log("game over!");
      this.game.running = false;
    }
}

PlayGame.prototype.draw = function (ctx) {
    if (!this.game.running) {
        this.ctx.font = "  24pt Impact";
        this.ctx.fillStyle = "yellow";
        if (this.game.mouse) { this.ctx.fillStyle = "white"; }
        if (this.game.lives > 0) {
            this.ctx.fillText("Welcome to Area 51! Click to play the game!", this.game.camera.xView + 100, this.game.camera.yView + 200);
        }
        else {
            this.ctx.fillText("Oh no! The Aliens have won! Better luck next time!", this.game.camera.xView + 100, this.game.camera.yView + 200);
        }
    }
}
