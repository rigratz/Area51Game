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
    this.count = 0;
}

PlayGame.prototype = new Entity();
PlayGame.prototype.constructor = PlayGame;

PlayGame.prototype.reset = function () {
    this.game.running = false;
}
PlayGame.prototype.update = function () {
    if (this.game.click && this.game.lives > 0) {
        if (this.game.mouse.y >= 17) {
            if (this.game.mouse.x >= 1 && this.game.mouse.x <= 4) {
               this.game.running = true;
               this.removeFromWorld = true;
            }
            if (this.game.mouse.x >= 6 && this.game.mouse.x <= 9) {
              this.game.password = prompt("Please enter your save code!");  //GRRRRRRR IT KEEPS POPPING UP TWO PROMPTS!!!
             // console.log(this.game.password);
              this.game.socket.emit("load", { studentname: this.game.password, statename: "savedArea51"});
              this.game.running = true;
              this.removeFromWorld = true;       
           }
        }
    } else if (this.game.lives <= 0) {
     //   console.log("game over!");
      this.game.running = false;
    }
   // Entity.prototype.update.call(this);
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
            if (this.game.mouse) {
             this.ctx.fillStyle = "white"; 
           //   console.log(this.game.mouse);
            }
            this.ctx.strokeStyle = "black";
            this.ctx.strokeRect(25, 550, 145, 70);
            this.ctx.strokeRect(178, 550, 145, 70);
            this.ctx.fillStyle = "yellow";
            this.ctx.fillText("New Game", 30, 600);
            this.ctx.fillText("Load Game", 180, 600);
        }
        else {

            this.ctx.fillText("Oh no! The Aliens have won! Better luck next time!", 100, 200);
        }
    }
    this.ctx.restore();

}
