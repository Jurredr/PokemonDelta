import Tileset from './Tileset';
export default class Level {
    constructor(levelSrc) {
        this.tilesets = JSON.parse(levelSrc).map(
            ({ file, tileWidth, tileHeight }) =>
                new Tileset(file, tileWidth, tileHeight)
        );
    }
}
