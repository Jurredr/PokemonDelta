import Screen from '../graphics/Screen';

export default class World {
    constructor(name, tileProvider) {
        this.name = name;
        this.tileProvider = tileProvider;
        this.entities = [];
    }

    update(delta) {
        this.entities.forEach((entity) => {
            entity.update(delta);
        });
    }

    draw() {
        const tilesX = Screen.scaledWidth() / this.tileProvider.tileWidth + 1;
        const tilesY = Screen.scaledHeight() / this.tileProvider.tileHeight + 1;

        for (var x = 0; x < tilesX; x++) {
            for (var y = 0; y < tilesY; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth,
                    y * this.tileProvider.tileHeight,
                    x,
                    y
                );
            }
        }

        this.entities.forEach((entity) => {
            entity.draw();
        });
    }
}
