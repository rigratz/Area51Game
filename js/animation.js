function Animation(entityType, spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse, type, size) {
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
    this.frame = 0;
    this.size = size;
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
    else if(this.entityType === 'shadow_enemy') {
        this.drawFrameShadowEnemy(tick, ctx, x, y);
    }
    else if(this.entityType === 'snake_enemy') {
        this.drawFrameSnakeEnemy(tick, ctx, x, y);
    }
    else if(this.entityType === 'snail_enemy') {
        this.drawFrameSnailEnemy(tick, ctx, x, y);
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
        yframe = 4;
    } else if (this.type === "idleleft") {
        xframe = 334 + (xindex * this.frameWidth);
        yframe = 4;
    }else if (this.type === "right") {
        xframe = 16 + (xindex * this.frameWidth);
        yframe = 201;
    } else if (this.type === "left") {
        xframe = 14+ (xindex * this.frameWidth);
        yframe = 441;
    } else if (this.type === "jump") {
        xframe = 1 + (xindex * this.frameWidth);
        yframe = 117;
    } else if (this.type === "jumpleft") {
      xframe = 380 + (xindex * this.frameWidth);
      yframe = 117;
    } else if (this.type === "crouch") {
      xframe = 9;
      yframe = 581;
        y = y + 21;
    } else if (this.type === "crouchleft") {
      xframe = 149;
      yframe = 581;
        y = y + 21;
    }else if (this.type === "up") {
      xframe = 19;
      yframe = 687;
        y = y - 37;
    }
    var width_mult = 2.5;
    var height_mult = 2.5;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth,
        this.frameHeight);
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

    //console.log(this.type);

    var width_mult = 0.5;
    var height_mult = 0.5;
    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x - 50, y - 32,
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
    if(this.type < 1) {
        y += 10;
    }
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

Animation.prototype.drawFrameShadowEnemy = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = frame % 6;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;

    var width_mult = 2;
    var height_mult = 2;
    xframe = xindex * this.frameWidth + 2;

    if (this.type === "left") {
        yframe = 64;
    }
    else if (this.type === "right") {
        yframe = 0;
    }

    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameSnakeEnemy = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    this.frame = this.currentFrame();
    var xindex = this.frame % 6;
    var yindex = 0;
    var xframe = 0;
    var yframe = 0;

    if(this.type === "rightidle") {
        //console.log("right and idle!")
        yframe = 145;
        xindex = this.frame % 3;
        xframe = xindex * this.frameWidth + 600;
    } else if(this.type === "rightattack") {
        yframe = 145;
        xindex = this.frame % 6;
        xframe = xindex * this.frameWidth;
    } else if(this.type === "idle") {
        xindex = this.frame % 3;
        xframe = xindex * this.frameWidth;

    }
    //else if (this.type === "right") {
    //    console.log("right and attack!");
    //    yframe = 150;
    //    xindex = this.frame % 2;
    //    xframe = xindex * this.frameWidth;
    //}

    else {
        xframe = xindex * this.frameWidth;

    }


    //console.log(this.frame);
    if(this.frame === 5) {
        //x = x - 100;
    }
    var width_mult = 1.25;
    var height_mult = 1;

    if(this.size === 2) {
        width_mult = 3;
        height_mult = 3;
        y = y - 250;
    } else {
        //y = y - 25;
    }


    ctx.drawImage(this.spriteSheet,
        xframe, yframe,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * width_mult,
        this.frameHeight * height_mult);
}

Animation.prototype.drawFrameSnailEnemy = function(tick, ctx, x, y) {
    this.elapsedTime += tick;
    this.time += tick;
    if(this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    this.frame = this.currentFrame();
    var xindex = this.frame % 8;
    var xframe = xindex * this.frameWidth + 50;


    var yindex = 0;
    //var xframe = 0;
    var yframe = 0;

    //xframe = xindex * this.frameWidth;

    var width_mult = 2;
    var height_mult = 2;


    if(this.type === "left") {
        yframe = 150;
    } else {
        yframe = 50;
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
