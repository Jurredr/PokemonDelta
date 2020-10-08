import GameLoop from '../../../other/GameLoop';

export default class Animator {
    constructor(position, tileset, y, fps = 1) {
        this.running = true;
        this.position = position;
        this.x = 0;
        this.y = y;
        this.tileset = tileset;
        this.frameCount = 0;
        this.fps = fps;
    }
    draw(cx, cy) {
        if (this.running) {
            this.frameCount += GameLoop.frame.dt;
            if (this.frameCount >= 1000 / this.fps) {
                this.frameCount -= 1000 / this.fps;

                this.x += 1;
                if (this.x >= this.tileset.width) this.x = 0;
            }
        }

        this.tileset.drawTile(
            this.position.x * 32 + this.position.imgOffsetX - cx,
            this.position.y * 32 + this.position.imgOffsetY - cy,
            this.x,
            this.y
        );
    }
}
