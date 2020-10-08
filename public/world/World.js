import Screen from '../graphics/Screen';

export default class World {
    constructor(name, tileProvider) {
        this.name = name;
        this.tileProvider = tileProvider;
        this.entities = [];

        this.worldRender = Screen.sketch.createGraphics(
            tileProvider.width * 32,
            tileProvider.height * 32
        );

        this.camera = {
            follow: null,
            x: 10,
            y: 0,
        };

        this.drawn = false;
    }

    update(delta) {
        if (this.camera.follow) {
            const follow = this.camera.follow;
            this.camera.x =
                follow.position.x * this.tileProvider.tileWidth +
                follow.position.imgOffsetX -
                Screen.scaledWidth() / 2 +
                16;
            this.camera.y =
                follow.position.y * this.tileProvider.tileHeight +
                follow.position.imgOffsetY -
                Screen.scaledHeight() / 2 +
                16;
        }

        this.entities.forEach((entity) => {
            entity.update(delta);
        });
    }

    draw() {
        // We really need a way to wait for the textures to be loaded
        if (!this.drawn && this.tileProvider.tileset.width !== undefined) {
            this.drawn = true;
            this.redraw();
        }

        Screen.graphics.image(this.worldRender, -this.camera.x, -this.camera.y);

        this.entities.forEach((entity) => {
            entity.draw();
        });
    }

    redraw() {
        this.worldRender.background(0);

        for (var x = 0; x < this.tileProvider.width; x++) {
            for (var y = 0; y < this.tileProvider.height; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth,
                    y * this.tileProvider.tileHeight,
                    x,
                    y,
                    this.worldRender
                );
            }
        }
    }
}
