function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.audioCache = [];
    this.downloadQueue = [];
    this.audioDownloadQueue = [];
}

AssetManager.prototype.queueDownload = function (path) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
}

AssetManager.prototype.queueAudioDownload = function(path) {
    console.log("Queueing audio: " + path);
    this.audioDownloadQueue.push(path);
}

AssetManager.prototype.isDone = function () {
    return this.downloadQueue.length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {
    for (var i = 0; i < this.audioDownloadQueue.length; i++) {
        console.log(this.audioDownloadQueue[i]);
        var audio = new Audio();
        console.log(audio);
        var that = this;
        var path = this.audioDownloadQueue[i];
        audio.src = path;
        this.audioCache[path] = audio;
        console.log(audio.src);
        console.log(this.audioCache);
    }
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var img = new Image();
        var that = this;
        var path = this.downloadQueue[i];

        img.addEventListener("load", function () {
            console.log("Loaded " + this.src);
            that.successCount++;
            if(that.isDone()) callback();
        });

        img.addEventListener("error", function () {
            console.log("Error loading " + this.src);
            that.errorCount++;
            if (that.isDone()) callback();
        });
        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}
AssetManager.prototype.getAudioAsset = function (path) {
    return this.audioCache[path];
}
