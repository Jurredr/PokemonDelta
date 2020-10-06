export {canvas, ctx, frame, addToDraw, removeToDraw};

const canvas = document.createElement("canvas");
// canvas.style.width = "100%";
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

window.addEventListener("load", onload);
function onload(){
    document.getElementById("canvasContainer").appendChild(canvas);
    onresize();
}
window.addEventListener("resize", onload);
function onresize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/** @type {Set[Function]} */
const toDraw = [];
function addToDraw(drawFunc, priority=0){
    toDraw[priority] ??= new Set();
    toDraw[priority].add(drawFunc);
}
function removeToDraw(drawFunc, priority=0){
    toDraw[priority]?.delete(drawFunc)
}
const frame = {
    t:0,
    dt:1000/60,
    get rate(){return 1000/this.dt;}
}
function draw(t){
    requestAnimationFrame(draw)
    frame.dt = t - frame.t
    frame.t = t;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (const layer of toDraw){
        for (const drawFunc of layer){
            drawFunc();
        }
    }
}
requestAnimationFrame(draw)
