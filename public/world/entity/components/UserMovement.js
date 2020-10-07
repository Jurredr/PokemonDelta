import Screen from '../../../graphics/Screen';

export default class UserMovement {
    constructor(movement) {
        this.movement = movement;
    }

    update() {
        if (Screen.sketch.keyIsDown('W'.charCodeAt(0))) {
            this.movement.move(0, -1);
        }

        if (Screen.sketch.keyIsDown('S'.charCodeAt(0))) {
            this.movement.move(0, 1);
        }

        if (Screen.sketch.keyIsDown('A'.charCodeAt(0))) {
            this.movement.move(-1, 0);
        }

        if (Screen.sketch.keyIsDown('D'.charCodeAt(0))) {
            this.movement.move(1, 0);
        }
    }
}
