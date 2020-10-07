import {ctx} from './Screen';

export default class Tileset {
    isDone = false
    constructor(file, tileWidth, tileHeight) {
        /** @type {HTMLImageElement} */
        this.image = document.createElement("img");
        this.image.onload = () => { this.isDone = true; }
        this.image.src = file;
        
        
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    drawTile(x, y, tx, ty) {
        // if (this.isDone)return;
        ctx.drawImage(
                this.image,
                tx * this.tileWidth,
                ty * this.tileHeight,
                this.tileWidth,
                this.tileHeight,
                x,
                y,
                this.tileWidth,
                this.tileHeight
            );
    }
}
