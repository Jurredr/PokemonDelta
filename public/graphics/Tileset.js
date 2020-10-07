import Screen from './Screen';

export default class Tileset {
    constructor(file, tileWidth, tileHeight) {
        this.image = Screen.sketch.loadImage(file);
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    drawTile(x, y, tx, ty) {
        Screen.sketch.image(
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
