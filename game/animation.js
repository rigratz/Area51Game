function Animation(entityType, spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse, type) {
    this.entityType = entityType;
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.type = type;
    this.timesLooped = 0;

    this.time = 0;
    console.log(this.spriteSheet);
}



Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    //var yindex = 0;
    // if (frame > 7) {
    //     frame = 14 - frame;
    // }
    if (this.entityType === "player") {
        xindex = frame % 4;
        yindex = Math.floor(frame / 7);
    }
    if (this.entityType === "bird_enemy") {
        xindex = frame % 8;
        yindex = 0;
    }


    //console.log(frame + " " + xindex + " " + yindex);

    // ctx.drawImage(this.spriteSheet,
    //              xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
    //              this.frameWidth, this.frameHeight,
    //              x, y,
    //              this.frameWidth *3,
    //              this.frameHeight*3);
    var xframe = 0;
    var yframe = 0;
    if (this.type === "idle") {
        xframe = 3 + (xindex * this.frameWidth);
        yframe = 2;
    } else if (this.type === "right") {
        xframe = 3 + (xindex * this.frameWidth);
        yframe = 81;
    } else if (this.type === "jump") {
        xframe = 1 + (xindex * this.frameWidth);
        yframe = 45;
    }

    width_mult = 3;
    height_mult = 3;


    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}