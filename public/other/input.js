import GameLoop from './GameLoop';

// prettier-ignore
const input = {
    key:          (name) => input.keys       [name],
    keyBefore:    (name) => input.keysBefore [name],
    keydown:      (name) => input.keysDown   [name],
    keyup:        (name) => input.keysUp     [name],
    keypress:     (name) => input.keysPressed[name],
    keyTransDown: (name) => this.key(name) && !this.keyBefore(name),
    keyTransUp:   (name) => !this.key(name) && this.keyBefore(name),
    keys: {},
    keysBefore: {},
    keysDown: {},
    keysUp: {},
    keysPressed: {}
};
export default input;
GameLoop.add(nextInput, GameLoop.layerOrder.clearInput);

function nextInput() {
    copy(input.keys, input.keysBefore);
    clearAll();
}

function clearAll() {
    input.keysDown = {};
    input.keysUp = {};
    input.keysLastDown = [];
}
function copy(from, to) {
    for (let i in from) {
        to[i] = from[i];
    }
}

window.addEventListener('keydown', (e) => {
    input.keys[e.key] = 1;
    input.keysDown[e.key] = 1;
});

window.addEventListener('keyup', (e) => {
    input.keys[e.key] = 0;
    input.keysUp[e.key] = 1;
});

window.addEventListener('keypress', (e) => {
    input.keysPressed[e.key] = 1;
});
