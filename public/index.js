import Tileset from './graphics/Tileset';

import res from 'res/**/*.*';

import {ctx, addToDraw, frame, canvas} from './graphics/Screen'

const outside = new Tileset(res.img.outside.png, 32, 32);
let i = 0;
addToDraw(drawBackground);
function drawBackground(){
    outside.drawTile((frame.t*0.1)%canvas.width,frame.dt, 2, 0);
}


