import Screen from '../graphics/Screen';

export default class TempTileProvider {
    constructor(tileset) {
        this.tileset = tileset;
        this.tileWidth = tileset.tileWidth;
        this.tileHeight = tileset.tileHeight;

        this.map = [
            [
                [1, 1, 1, 1, 1],
                [1, 6, 6, 6, 1],
                [1, 6, 6, 6, 1],
                [1, 6, 6, 6, 1],
                [1, 1, 1, 1, 1],
            ],
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 948, 0],
            ],
        ];

        this.width = this.map[0][0].length;
        this.height = this.map[0].length;
    }

    getTile(layer, x, y) {
        if (layer < 0 || layer >= this.map.length) {
            return 0;
        }

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.map[layer][y][x];
        }

        return 0;
    }

    isSolid(x, y) {
        for (var layer = 0; layer < this.map.length; layer++) {
            if (this.getTile(layer, x, y) === 948) {
                return true;
            }
        }

        return false;
    }

    drawTile(x, y, tx, ty) {
        for (var layer = 0; layer < this.map.length; layer++) {
            const tile = this.getTile(layer, tx, ty);

            if (tile === 0) continue;

            const tileX = tile % this.tileset.width;
            const tileY = Math.floor(tile / this.tileset.width);

            this.tileset.drawTile(x, y, tileX, tileY);
        }

        if (this.isSolid(tx, ty)) {
            Screen.sketch.noFill();
            Screen.sketch.stroke(255, 0, 0);
            Screen.sketch.rect(
                x,
                y,
                this.tileset.tileWidth,
                this.tileset.tileHeight
            );
        }
    }
}
