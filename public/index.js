import p5 from 'p5';

import Screen from './graphics/Screen';
import Tileset from './graphics/Tileset';
import World from './world/World';
import TempTileProvider from './world/TempTileProvider';
import Player from './world/entity/Player';

import res from 'res/**/*.*';

const p5Instance = new p5((sketch) => {
    var world;

    sketch.setup = () => {
        Screen.init(sketch);
        window.onresize();

        const tileProvider = new TempTileProvider(
            new Tileset(res.img.outside.png, 32, 32)
        );
        world = new World('test', tileProvider);

        const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
        world.entities.push(new Player(world, playerTileset));
    };

    sketch.draw = () => {
        const delta = sketch.deltaTime;
        world.update(delta);

        Screen.draw();
        world.draw();
    };
});

window.onresize = () => {
    p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
};
