const fs = require('fs');
module.exports = Gallery;

function Gallery(contents){
    if(!(this instanceof Gallery))
        return new Gallery(contents);
    this.path = "./images";
    this.images = [];
    this.size = 0;

    fs.readdir(this.path, (err, files) => {
        files.forEach(file => {
            this.images.push(this.path+"/"+file);
            this.size++;
        });
    });
    this.contents = contents;
    this.index = 0;
}

Gallery.prototype.getImage = function(){
    this.index = this.index + 1 < this.size ? this.index + 1 : 0;
    let image = this.images[this.index];
    return image;
}

Gallery.prototype.run = function(){
    setInterval(() => {
        this.contents.send("new-image", this.getImage());
    }, 5000);
}
