/*
  The AssetManager is used to download and store the information needed to
  load the image and audio data used in the game. It stores paths for the image
  and audio files in a cache to be recalled later.
*/
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.audioCache = [];
    this.downloadQueue = [];
    this.audioDownloadQueue = [];
}
/*
  queueDownload pushes an image file into a queue to be made ready for download.
*/
AssetManager.prototype.queueDownload = function (path) {
    console.log("Queueing " + path);
    this.downloadQueue.push(path);
}
/*
  queueAudioDownload pushes an audio file into a queue to be made ready for
  download.
*/
AssetManager.prototype.queueAudioDownload = function(path) {
    console.log("Queueing audio: " + path);
    this.audioDownloadQueue.push(path);
}
/*
  Helper function to determine if all image/audio downloads are done. Returns
  true if downloads are finished.
*/
AssetManager.prototype.isDone = function () {
    return this.downloadQueue.length === this.successCount + this.errorCount;
}

/*
  downloadAll reads through both image and audio queues and stores all data
  in the appropriate caches.
*/
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

/*
  getAsset is the function an entity calls the retrieve image data given its
  proper file path.
*/
AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}
/*
  getAudioAsset is the function an entity calls the retrieve audio data given its
  proper file path.
*/
AssetManager.prototype.getAudioAsset = function (path) {
    return this.audioCache[path];
}
