import { addToDraw, layerOrder } from '../graphics/Screen';

// prettier-ignore
export default {
    key:          (name) => input.keys       [name],
    keyBefore:    (name) => input.keysBefore [name],
    keydown:      (name) => input.keysDown   [name],
    keyup:        (name) => input.keysUp     [name],
    keypress:     (name) => input.keysPressed[name],
    keyTransDown: (name) => this.key(name) && !this.keyBefore(name),
    keyTransUp:   (name) => !this.key(name) && this.keyBefore(name),
    get keyLastDown() {
        input.keyLastDown;
    },
};
const input = {
    keys: {},
    keysBefore: {},
    keysDown: {},
    keysUp: {},
    keysPressed: {},
    keyLastDown: '',
};

addToDraw(nextInput, layerOrder.clearInput);

function nextInput() {
    copy(input.keys, input.keysBefore);
    clearAll();
}

function clearAll() {
    input.keysDown = {};
    input.keysUp = {};
    input.keyLastDown = '';
}
function copy(from, to) {
    for (let i in from) {
        to[i] = from[i];
    }
}

window.addEventListener('keydown', (e) => {
    input.keys[e.key] = 1;
    input.keysDown[e.key] = 1;
    input.keyLastDown = e.key;
});

window.addEventListener('keyup', (e) => {
    input.keys[e.key] = 0;
    input.keysUp[e.key] = 1;
});

window.addEventListener('keypress', (e) => {
    input.keysPressed[e.key] = 1;
});
