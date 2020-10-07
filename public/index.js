import Tileset from './graphics/Tileset';

import res from 'res/**/*.*';

import {ctx, addToDraw, frame, canvas} from './graphics/Screen'

import input from './other/input'

const musicPlayer = new Audio(res.audio.pallettown.mp3);

// import {loadSound, playSound} from './audio'
const outside = new Tileset(res.img.outside.png, 32, 32);
window.addEventListener("click", startSound);
function startSound(){
    musicPlayer.play();
}

class Player{
    x;y;
    targetX;targetY;
    constructor(x, y){
        this.x = x; this.y = y;
        this.targetX = x; this.targetY = y;
    }
    input(){
        if (input.key('a')) { x-= frame.dt * vy; }
        if (input.key('d')) { x+= frame.dt * vy; }
        if (input.key('w')) { y-= frame.dt * vy; }
        if (input.key('s')) { y+= frame.dt * vy; }
    }
    draw(){
        ctx.fillRect(x,y,100, 100);
    }
}


addToDraw(drawBackground);
function drawBackground(){
    for (let y = 0; y < 20; y++){
        for (let x = 0; x < 10; x++){
            outside.drawTile(x*outside.tileWidth, y*outside.tileHeight, x, y);
        }
    }
}



