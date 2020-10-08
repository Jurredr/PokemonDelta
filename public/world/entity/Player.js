import Position from './components/Position';
import Animator from './components/Animator';
import UserMovement from './components/UserMovement';
import Movement from './components/Movement';
import GameLoop from '../../other/GameLoop';

export default class Player {
    constructor(world, tileset) {
        this.world = world;

        this.position = new Position(4, 2);
        this.position.imgOffsetY = -16;

        this.animator = new Animator(this.position, tileset, 0, 8);

        this.movement = new Movement(this.world, this.animator, this.position);
        this.userMovement = new UserMovement(this.movement);

        this.ordering = GameLoop.layerOrder.sprites;
        GameLoop.add(this.thisDraw, this.ordering);
    }
    destructor(){
        GameLoop.remove(this.thisDraw, this.ordering); 
    }

    update(delta) {
        this.movement.update(delta);
        this.userMovement.update(delta);
    }
    thisDraw = () => this.draw();
    draw() {
        this.animator.draw(this.world.camera.x, this.world.camera.y);
    }
}
