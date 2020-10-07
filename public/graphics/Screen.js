export { canvas, ctx, frame, layerOrder, addToDraw, removeToDraw };

// const camera = {
//     fov: 200,
//     x: 0,
//     y: 0,
//     target: null,
// };

// function drawImage(img, x, y, width, height) {
//     const scale = camera.fov / canvas.height;
//     const offsetX = camera.x - (0.5 * fov * canvas.width) / canvas.height;
//     const offsetY = camera.y - 0.5 * fov;
//     ctx.drawImage(
//         img,
//         scale * (x + offsetX),
//         scale * (y + offsetY),
//         width,
//         height
//     );
// }

const layerOrder = {
    input:0,
    background: 10,
    sprites: 100,
    foreground: 200,
    clearInput: 300,
};

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

window.addEventListener('load', onload);
function onload() {
    document.getElementById('canvasContainer').appendChild(canvas);
    onresize();
}
window.addEventListener('resize', onload);
function onresize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/** @type {Set[Function]} */
const toDraw = [];
function addToDraw(drawFunc, layer = 100) {
    toDraw[layer] ??= new Set();
    toDraw[layer].add(drawFunc);
}
function removeToDraw(drawFunc, layer = 0) {
    toDraw[layer]?.delete(drawFunc);
}
const frame = {
    t: 0,
    dt: 1000 / 60,
    get rate() {
        return 1000 / this.dt;
    },
};
function draw(t) {
    requestAnimationFrame(draw);
    frame.dt = t - frame.t;
    frame.t = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const ordering in toDraw) {
        const layer = toDraw[ordering];
        for (const drawFunc of layer) {
            drawFunc();
        }
    }
}
requestAnimationFrame(draw);
