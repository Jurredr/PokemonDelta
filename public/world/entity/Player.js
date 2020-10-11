import Position from './components/Position';
import Animator from './components/Animator';
import UserMovement from './components/UserMovement';
import Movement from './components/Movement';

export default class Player {
    constructor(world, tileset) {
        this.world = world;

        this.position = new Position(4, 2);
        this.position.imgOffsetY = -16;

        this.animator = new Animator(this.position, tileset, 0, 8);

        this.movement = new Movement(this.world, this.animator, this.position);
        this.userMovement = new UserMovement(this.movement);
    }

    update(delta) {
        this.movement.update(delta);
        this.userMovement.update(delta);
    }

    draw() {
        this.animator.draw(this.world.camera.x, this.world.camera.y);
    }

    step() {
        console.log(this.position);
    }
}
