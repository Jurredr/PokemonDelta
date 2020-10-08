import GameLoop from '../../../other/GameLoop'
export default class Movement {
    constructor(world, animator, position) {
        this.world = world;
        this.animator = animator;
        this.animator.running = false;
        this.position = position;
        this.speed = 128;
        this.targetImgOffsetX = position.imgOffsetX;
        this.targetImgOffsetY = position.imgOffsetY;
        this.moving = false;
    }

    move(x, y) {
        if (this.moving) return;

        if (y > 0) this.animator.y = 0;
        if (x < 0) this.animator.y = 1;
        if (x > 0) this.animator.y = 2;
        if (y < 0) this.animator.y = 3;

        const tileProvider = this.world.tileProvider;

        const newX = this.position.x + x;
        const newY = this.position.y + y;

        if (
            tileProvider.isSolid(newX, newY) ||
            newX < 0 ||
            newX >= tileProvider.width ||
            newY < 0 ||
            newY >= tileProvider.height
        ) {
            return;
        }

        this.position.x += x;
        this.position.y += y;

        this.position.imgOffsetX -= x * 32;
        this.position.imgOffsetY -= y * 32;

        this.moving = true;
        this.animator.running = true;
    }

    update() {
        const delta = GameLoop.frame.dt;
        if (!this.moving) {
            this.animator.running = false;
            this.animator.x = 0;
        }

        const speed = (this.speed / 1000) * delta;

        const distX = this.targetImgOffsetX - this.position.imgOffsetX;
        const distY = this.targetImgOffsetY - this.position.imgOffsetY;

        const dx = Math.min(Math.abs(distX), speed) * Math.sign(distX);
        const dy = Math.min(Math.abs(distY), speed) * Math.sign(distY);

        this.position.imgOffsetX += dx;
        this.position.imgOffsetY += dy;

        if (
            Math.abs(this.targetImgOffsetX - this.position.imgOffsetX) < 0.01 &&
            Math.abs(this.targetImgOffsetY - this.position.imgOffsetY) < 0.01
        ) {
            this.position.imgOffsetX = this.targetImgOffsetX;
            this.position.imgOffsetY = this.targetImgOffsetY;
            this.moving = false;
        }
    }
}
