import GameLoop from './GameLoop';
// prettier-ignore
const Input = {
    key:          (name) => Private.keys       [name.toUpperCase()],
    keyBefore:    (name) => Private.keysBefore [name.toUpperCase()],
    keydown:      (name) => Private.keysDown   [name.toUpperCase()],
    keyup:        (name) => Private.keysUp     [name.toUpperCase()],
    keypress:     (name) => Private.keysPressed[name.toUpperCase()],
    keyTransDown: (name) => Input.key(name)  && !Input.keyBefore(name),
    keyTransUp:   (name) => !Input.key(name) &&  Input.keyBefore(name),
};
export default Input;

const Private = {
    keys: {},
    keysBefore: {},
    keysDown: {},
    keysUp: {},
    keysPressed: {},
}

GameLoop.add(nextInput, GameLoop.layerOrder.clearInput);

function nextInput() {
    Object.assign(Private.keysBefore, Private.keys);
    clearAll();
}

function clearAll() {
    Private.keysDown = {};
    Private.keysUp = {};
    Private.keysPressed = {};
}

window.addEventListener('keydown', (e) => {
    Private.keys[e.key.toUpperCase()] = 1;
    Private.keysDown[e.key.toUpperCase()] = 1;
});

window.addEventListener('keyup', (e) => {
    Private.keys[e.key.toUpperCase()] = 0;
    Private.keysUp[e.key.toUpperCase()] = 1;
});

window.addEventListener('keypress', (e) => {
    Private.keysPressed[e.key.toUpperCase()] = 1;
});
