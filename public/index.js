// import Tileset from './graphics/Tileset';
import GameLoop from './other/GameLoop';
import Screen from './graphics/Screen'
import res from 'res/**/*.*';

Screen.init(new Screen.Graphics({}));


// import {ctx, addToDraw, removeToDraw, layerOrder  ,frame, canvas} from './graphics/Screen'
// import TempTileProvider from './world/TempTileProvider'
// import World from './world/World'
// import Player from './world/entity/Player'

// import audio from './other/audio'

// const outsideTileSet = new Tileset(res.img.outside.png, 32, 32)
// const tileProvider = new TempTileProvider(outsideTileSet);
// const world = new World('test', tileProvider);
// const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
// const player = new Player(world, playerTileset);
// world.entities.push(player);

// world.camera.follow = player;

const boy = document.createElement("img")
boy.src = res.img.boy_run.png

GameLoop.add(drawBackground, GameLoop.layerOrder.background);

function drawBackground(){
    Screen.main.ctx.fillStyle = "white";
    Screen.main.clear();
    Screen.main.rect(0,0,100,100);
}



// addToDraw(drawBackground, layerOrder.background);
// function drawBackground(){
// }
//     sketch.setup = () => {
//         Screen.init(sketch);
//         window.onresize();

//         const tileProvider = new TempTileProvider(
//             new Tileset(res.img.outside.png, 32, 32)
//         );
//         world = new World('test', tileProvider);

//         const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
//         const player = new Player(world, playerTileset);
//         world.entities.push(player);

//         world.camera.follow = player;
//     };

//     sketch.draw = () => {
//         const delta = frame.dt;
//         world.update(delta);

//         sketch.scale(Screen.zoom);

//         Screen.draw();
//         world.draw();
//     };
// });

// window.onresize = () => {
//     p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
// };
