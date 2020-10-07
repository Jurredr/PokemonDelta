import Tileset from './graphics/Tileset';

import res from 'res/**/*.*';

import {ctx, addToDraw, removeToDraw, layerOrder  ,frame, canvas} from './graphics/Screen'

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
    speed=0.1;
    constructor(x, y){
        this.x = x; this.y = y;
        this.targetX = x; this.targetY = y;
        addToDraw(()=>this.input(), layerOrder.input);
        addToDraw(()=>this.draw(), layerOrder.sprites);
    }
    destructor(){
        removeToDraw()
    }
    input(){
        if (input.key('a')) { this.x -= this.speed*frame.dt; }
        if (input.key('d')) { this.x += this.speed*frame.dt; }
        if (input.key('w')) { this.y -= this.speed*frame.dt; }
        if (input.key('s')) { this.y += this.speed*frame.dt; }
    }
    draw(){
        ctx.fillRect(0,0,100,100);
        outside.drawTile(this.x,this.y, 2, 2);
    }
}
const player = new Player(0, 0);

addToDraw(drawBackground, layerOrder.background);
function drawBackground(){
    for (let y = 0; y < 20; y++){
        for (let x = 0; x < 10; x++){
            outside.drawTile(x*outside.tileWidth, y*outside.tileHeight, x, y);
        }
    }
}



