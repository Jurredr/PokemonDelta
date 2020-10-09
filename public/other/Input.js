import GameLoop from './GameLoop';

// prettier-ignore
const Input = {
    key:          (name) => Input.keys       [name.toUpperCase()],
    keyBefore:    (name) => Input.keysBefore [name.toUpperCase()],
    keydown:      (name) => Input.keysDown   [name.toUpperCase()],
    keyup:        (name) => Input.keysUp     [name.toUpperCase()],
    keypress:     (name) => Input.keysPressed[name.toUpperCase()],
    keyTransDown: (name) => Input.key(name) && !Input.keyBefore(name),
    keyTransUp:   (name) => !Input.key(name) && Input.keyBefore(name),
    keys: {},
    keysBefore: {},
    keysDown: {},
    keysUp: {},
    keysPressed: {}
};
export default Input;
GameLoop.add(nextInput, GameLoop.layerOrder.clearInput);

function nextInput() {
    Object.assign(Input.keysBefore, Input.keys);
    clearAll();
}

function clearAll() {
    Input.keysDown = {};
    Input.keysUp = {};
    Input.keysPressed = {};
    Input.keysLastDown = [];
}

window.addEventListener('keydown', (e) => {
    Input.keys[e.key.toUpperCase()] = 1;
    Input.keysDown[e.key.toUpperCase()] = 1;
});

window.addEventListener('keyup', (e) => {
    Input.keys[e.key.toUpperCase()] = 0;
    Input.keysUp[e.key.toUpperCase()] = 1;
});

window.addEventListener('keypress', (e) => {
    Input.keysPressed[e.key.toUpperCase()] = 1;
});
