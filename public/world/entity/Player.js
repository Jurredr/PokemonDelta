import Position from './components/Position';
import Animator from './components/Animator';

export default class Player {
    constructor(world, tileset) {
        this.world = world;

        this.position = new Position(4, 2);
        this.position.imgOffsetY = -16;

        this.animator = new Animator(this.position, tileset, 0, 5);
    }

    draw() {
        this.animator.draw();
    }
}
