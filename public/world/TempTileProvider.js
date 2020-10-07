export default class TempTileProvider {
    constructor(tileset) {
        this.tileset = tileset;
        this.tileWidth = tileset.tileWidth;
        this.tileHeight = tileset.tileHeight;

        this.map = [
            [1, 1, 1, 1, 1],
            [1, 6, 6, 6, 1],
            [1, 6, 6, 6, 1],
            [1, 6, 6, 6, 1],
            [1, 1, 1, 1, 1],
        ];
    }

    getTile(x, y) {
        if (x < this.map.length && y < this.map[x].length) {
            return this.map[x][y];
        }

        return 1;
    }

    isSolid(_x, _y) {
        return false;
    }

    drawTile(x, y, tx, ty) {
        this.tileset.drawTile(x, y, this.getTile(tx, ty), 0);
    }
}
