import input from '../../../other/Input'

export default class UserMovement {
    constructor(movement) {
        this.movement = movement;
        this.keysDown = [];
    }

    update() {
        const newKeysDown = this.currentKey = ['w', 's', 'a', 'd']
            .filter((k) => input.keydown(k));
        this.keysDown = this.keysDown.concat(newKeysDown);

        const newKeys = this.currentKey = ['w', 's', 'a', 'd']
            .filter((k) => input.key(k));

        if (this.keysDown.length > 0 && this.movement) {
            let lastKey = this.keysDown[this.keysDown.length-1];
            
            this.keysDown = [lastKey]
            if (!input.key(lastKey)){
                lastKey = newKeys[0];
            }
            if (input.key(lastKey)){
                switch (lastKey) {
                    case 'w':
                        this.movement.move(0, -1);
                        break;
                    case 's':
                        this.movement.move(0, 1);
                        break;
                    case 'a':
                        this.movement.move(-1, 0);
                        break;
                    case 'd':
                        this.movement.move(1, 0);
                        break;
                }
            }
        }
    }
}
