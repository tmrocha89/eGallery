const fs = require('fs');
module.exports = Gallery;

let extensions = [".png", ".jpg", ".jpeg", ".bmp"];//for now

function Gallery(contents){
    if(!(this instanceof Gallery))
        return new Gallery(contents);
    this.path = "./images";
    this.images = [];
    this.size = 0;
    this.index = 0;
    this.contents = contents;
    this.time = 1000;
    this.interval = null;

    fs.readdir(this.path, (err, files) => {
        files.forEach(file => {
            if(file.match(/\.png|\.jp(e)?g|\.bmp$/i)){
                this.images.push(this.path+"/"+file);
                this.size++;
            }
        });
    });
}

Gallery.prototype.getImage = function(){
    this.index = this.index + 1 < this.size ? this.index + 1 : 0;
    let image = this.images[this.index];
    return image;
}

Gallery.prototype.run = function(){
    this.interval = _change.call(this);
}

function _change() {
    return setInterval(() => {
        let img = this.getImage();
        this.contents.send("new-image", `"${img}"`);
    }, this.time);
}

function _updateInterval(){
    clearInterval(this.interval);
    this.run();
}

Gallery.prototype.speedDown = function(){
    this.time += 1000;
    _updateInterval.call(this);
};

Gallery.prototype.speedUp = function(){
    this.time -= 1000;
    if(this.time <= 1000){
        this.time = 1000;
    }
    _updateInterval.call(this);
};
