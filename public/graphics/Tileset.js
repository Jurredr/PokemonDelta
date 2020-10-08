import Screen from './Screen';

export default class Tileset {
    constructor(file, tileWidth, tileHeight) {
        /** @type {HTMLImageElement} */
        this.image = document.createElement('img');
        this.image.src = file;
        this.image.onload = () => {
            this.width = this.image.width / tileWidth;
            this.height = this.image.height / tileHeight;
        };
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    drawTile(x, y, tx, ty) {
        Screen.main.image(
            this.image,
            x,
            y,
            this.tileWidth,
            this.tileHeight,
            tx * this.tileWidth,
            ty * this.tileHeight,
            this.tileWidth,
            this.tileHeight
        );
    }
}
