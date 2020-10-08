import GameLoop from '../other/GameLoop';
import Screen from '../graphics/Screen';
export default class World {
    constructor(name, tileProvider) {
        this.name = name;
        this.tileProvider = tileProvider;
        this.entities = [];

        this.camera = Screen.camera ?? {
            follow: null,
            x: 10,
            y: 0,
        };

        GameLoop.add(() => this.update(), GameLoop.layerOrder.input + 1);
        GameLoop.add(() => this.draw(), GameLoop.layerOrder.background);
    }

    update() {
        if (this.camera.follow) {
            const follow = this.camera.follow;
            this.camera.x =
                follow.position.x * this.tileProvider.tileWidth +
                follow.position.imgOffsetX +
                16;
            this.camera.y =
                follow.position.y * this.tileProvider.tileHeight +
                follow.position.imgOffsetY +
                16;
            Screen.main.updateCamera(this.camera);
        }
    }

    draw() {
        const startX =
            Math.floor((this.camera.x-Screen.main.camera.scaledWidth()) / this.tileProvider.tileWidth) - 1;
        const startY =
            Math.floor((this.camera.y-Screen.main.camera.scaledHeight()) / this.tileProvider.tileHeight) - 1;
        const tilesX =
            Math.floor(
                2*Screen.main.camera.scaledWidth() / this.tileProvider.tileWidth
            ) + 2;
        const tilesY =
            Math.floor(
                2*Screen.main.camera.scaledHeight() / this.tileProvider.tileHeight
            ) + 2;
        for (let x = startX; x < startX + tilesX; x++) {
            for (let y = startY; y < startY + tilesY; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth,
                    y * this.tileProvider.tileHeight,
                    x,
                    y
                );
            }
        }
    }
}
