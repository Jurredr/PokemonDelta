import GameLoop from './other/GameLoop';
import Screen from './graphics/Screen';
import res from 'res/**/*.*';

import Tileset from './graphics/Tileset';
import TempTileProvider from './world/TempTileProvider';
import World from './world/World';
import Player from './world/entity/Player';

import Sound from './other/Sound';

Sound.volume = 0.5;

Sound.load(res.audio.pallet_town.mp3, 1, true, true);

Screen.init(new Screen.Graphics({parentElementQuery:"#mainCanvasDiv", canvas:document.createElement("canvas")}));

const outsideTileSet = new Tileset(res.img.outside.png, 32, 32);
const tileProvider = new TempTileProvider(outsideTileSet);
const world = new World('test', tileProvider);
const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
const player = new Player(world, playerTileset);
world.entities.push(player);

world.camera.follow = player;

const boy = document.createElement('img');
boy.src = res.img.boy_run.png;

GameLoop.add(drawBackground, GameLoop.layerOrder.background);

function drawBackground() {
    Screen.main.ctx.fillStyle = 'white';
    Screen.main.clear();
    world.draw();
}
