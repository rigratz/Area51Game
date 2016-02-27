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
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    if (this.entityType === 'player') {
        this.drawFramePlayerOne(tick, ctx, x, y);
    }
    else if (this.entityType === 'bird_enemy') {
        this.drawFrameBirdEnemy(tick, ctx, x, y);
    }
    else if (this.entityType === 'dragon') {
        this.drawFrameDragon(tick, ctx, x, y);
    }
    else if (this.entityType === 'bullet') {
        this.drawFrameBullet(tick, ctx, x, y);
    }
    else if (this.entityType === 'tree_boss') {
        this.drawFrameTreeBoss(tick, ctx, x, y);
    }
    else if (this.entityType === 'tree_boss_attack') {
        this.drawFrameTreeBossAttack(tick, ctx, x, y);
    }
    else if (this.entityType === 'crazycat') {
        this.drawFrameCrazyCat(tick, ctx, x, y);
    }
}

Animation.prototype.drawFramePlayerOne = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    if (this.entityType === "player") {
        xindex = frame % 4;
        yindex = Math.floor(frame / 7);
    }
    var xframe = 0;
    var yframe = 0;
    if (this.type === "idle") {
        xframe = 3 + (xindex * this.frameWidth);
        yframe = 2;
    } else if (this.type === "idleleft") {
        xframe = 132 + (xindex * this.frameWidth);
        yframe = 2;
    }else if (this.type === "right") {
        xframe = 3 + (xindex * this.frameWidth);
        yframe = 81;
    } else if (this.type === "left") {
        xframe = 3+ (xindex * this.frameWidth);
        yframe = 177;
    } else if (this.type === "jump") {
        xframe = 1 + (xindex * this.frameWidth);
        yframe = 45;
    } else if (this.type === "jumpleft") {
      xframe = 152 + (xindex * this.frameWidth);
      yframe = 45;
    } else if (this.type === "crouch") {
      xframe = 9;
      yframe = 233;
        y = y + 21;
    } else if (this.type === "crouchleft") {
      xframe = 61;
      yframe = 233;
        y = y + 21;
    }else if (this.type === "up") {
      xframe = 9;
      yframe = 275;
        y = y - 37;
    }
    var width_mult = 2.5;
    var height_mult = 2.5;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameBirdEnemy = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var width_mult = 2.5;
    var height_mult = 2.5;

    var frame = this.currentFrame();
    var xindex = frame % 8;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;
    if (this.type === "idle") {
        //console.log("IDLE BIRD");
        xframe = xindex * this.frameWidth;
        yframe = 2;     //shuld be 0?
    } else if (this.type === "left") {
        xframe = xindex * this.frameWidth;
        yframe = 100;
    } else if (this.type === "right") {
        xframe = xindex * this.frameWidth;
        yframe = 200;
    } else if(this.type === "cat") {
        xframe = xindex * this.frameWidth;
        yframe = 2;
    }

    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameDragon = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }

    var frame = this.currentFrame();
    var xindex = frame % 3;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;
    if (this.type === "idle") {
        xframe = xindex * this.frameWidth;
        yframe = 0;
    }
    var width_mult = 1.5;
    var height_mult = 1.5;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

// for use with the bullet animation sprite sheet, regular bullet doesn't need this
Animation.prototype.drawFrameBullet = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }

    var frame = this.currentFrame();
    var xindex = frame % 1;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;

    var width_mult = 0.5;
    var height_mult = 0.5;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameCrazyCat = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    //console.log("DRAWING CAT....");
    var frame = this.currentFrame();
    var xindex = frame % 7;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;

    var width_mult = this.type;
    var height_mult = this.type;
    xframe = xindex * this.frameWidth;
    //console.log(this.spriteSheet);
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameTreeBoss = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var width_mult = 1.5;
    var height_mult = 1.5;

    var frame = this.currentFrame();
    var xindex = frame % 12;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;
    xframe = xindex * this.frameWidth;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}
Animation.prototype.drawFrameTreeBossAttack = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var width_mult = 1.5;
    var height_mult = 1.5;

    console.log(y);
    var frame = this.currentFrame();
    var xindex = frame % 8;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;
    if (this.type === "attacking") {
        xframe = xindex * this.frameWidth;
        yframe = 432;     //shuld be 0?
    }

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
