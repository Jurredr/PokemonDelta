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
        
        Screen.addToDraw(()=>this.update(), Screen.layerOrder.background);
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
        }
    }

    draw() {
        const startX =
            Math.floor(this.camera.x / this.tileProvider.tileWidth) - 1;
        const startY =
            Math.floor(this.camera.y / this.tileProvider.tileHeight) - 1;
        const tilesX =
            Math.floor(Screen.scaledWidth() / this.tileProvider.tileWidth) + 2;
        const tilesY =
            Math.floor(Screen.scaledHeight() / this.tileProvider.tileHeight) +
            3;

        for (var x = startX; x < startX + tilesX; x++) {
            for (var y = startY; y < startY + tilesY; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth - this.camera.x,
                    y * this.tileProvider.tileHeight - this.camera.y,
                    x,
                    y
                );
            }
        }
    }
}
