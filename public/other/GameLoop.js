const layerOrder = {
    input: 0,
    background: 10,
    sprites: 20,
    foreground: 30,
    clearInput: 100,
};

/** @type {Set[Function]} */
const loopFuncs = [];
function add(drawFunc, ordering = 100) {
    loopFuncs[ordering] ??= new Set();
    loopFuncs[ordering].add(drawFunc);
}
function remove(drawFunc, ordering = 0) {
    loopFuncs[ordering]?.delete(drawFunc);
}
const frame = {
    t: 0,
    dt: 1000 / 60,
    get rate() {
        return 1000 / this.dt;
    },
};
function onVSync(t) {
    requestAnimationFrame(onVSync); // for more performance
    frame.dt = t - frame.t;
    frame.t = t;
    for (const ordering in loopFuncs) {
        const layer = loopFuncs[ordering];
        for (const drawFunc of layer) {
            drawFunc();
        }
    }
    // requestAnimationFrame(onVSync); // when debugging
}
requestAnimationFrame(onVSync);

const GameLoop = {
    add,
    remove,
    frame,
    layerOrder,
};
export default GameLoop;
