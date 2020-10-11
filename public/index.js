import GameLoop from './other/GameLoop';
import Screen from './graphics/Screen';
import res from 'res/**/*.*';

import Tileset from './graphics/Tileset';
import TempTileProvider from './world/TempTileProvider';
import World from './world/World';
import Player from './world/entity/Player';

import Sound from './other/Sound';
import Animator from './world/entity/components/Animator';
import Position from './world/entity/components/Position';

Sound.load(res.audio.pallet_town.mp3, 1, true, true);

Sound.volume = 0.15;

Screen.init(
    new Screen.Graphics({
        parentElementQuery: '#mainCanvasDiv',
        canvas: document.createElement('canvas'),
    })
);

const outsideTileSet = new Tileset(res.img.outside.png, 32, 32);
const tileProvider = new TempTileProvider(outsideTileSet);
const world = new World('test', tileProvider);
const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
const player = new Player(world, playerTileset);
world.entities.push(player);

world.camera.follow = player;

const boy = document.createElement('img');
boy.src = res.img.boy_run.png;

const bulbasaur = new Tileset(res.img.pokemon.bulbasaurAni.png, 37, 38);
const bulbaAni = new Animator(new Position(3, 2), bulbasaur, 0, 12);
bulbaAni.position.imgOffsetX = -2
bulbaAni.position.imgOffsetY = -12

GameLoop.add(drawBackground, GameLoop.layerOrder.background);
function drawBackground() {
    // Screen.main.updateCamera({fov:Screen.main.camera.fov + 0.1});
    Screen.main.ctx.fillStyle = 'white';
    Screen.main.clear();
    world.draw();
    bulbaAni.draw();
}

const maxWheelZoomDelta = 7;
window.addEventListener("wheel", (e)=>{
    e.preventDefault();
    const delta = Math.min( maxWheelZoomDelta, Math.abs(e.deltaY) ) * Math.sign(e.deltaY);
    Screen.main.zoom(delta);
});
const keyZoomDelta = 20;
window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "+"){
        Screen.main.zoom(keyZoomDelta);
    } else if (e.key === "-"){
        Screen.main.zoom(-keyZoomDelta);
    }
});
