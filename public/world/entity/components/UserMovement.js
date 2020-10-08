import input from '../../../other/input'

export default class UserMovement {
    constructor(movement) {
        this.movement = movement;
        this.keysDown = [];
    }

    update() {
        for (const key of ['W', 'S', 'A', 'D']) {
            const i = this.keysDown.indexOf(key);
            const inArray = i > -1;

            if (input.key(key)) {
                if (!inArray) {
                    this.keysDown.push(key);
                }
            } else if (inArray) {
                this.keysDown.splice(i);
            }
        }

        if (this.keysDown.length > 0) {
            const lastKey = this.keysDown[this.keysDown.length - 1];

            switch (lastKey) {
                case 'W':
                    this.movement.move(0, -1);
                    break;
                case 'S':
                    this.movement.move(0, 1);
                    break;
                case 'A':
                    this.movement.move(-1, 0);
                    break;
                case 'D':
                    this.movement.move(1, 0);
                    break;
            }
        }
    }
}
