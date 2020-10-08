import p5 from 'p5';

import Screen from './graphics/Screen';
import Tileset from './graphics/Tileset';
import World from './world/World';
import TempTileProvider from './world/TempTileProvider';
import Player from './world/entity/Player';

import res from 'res/**/*.*';

const p5Instance = new p5((sketch) => {
    let world;

    sketch.setup = () => {
        Screen.init(sketch);
        window.onresize();

        const tileProvider = new TempTileProvider(
            new Tileset(res.img.outside.png, 32, 32)
        );
        world = new World('test', tileProvider);

        const playerTileset = new Tileset(res.img.boy_run.png, 32, 48);
        const player = new Player(world, playerTileset);
        world.entities.push(player);

        world.camera.follow = player;
    };

    sketch.draw = () => {
        const delta = sketch.deltaTime;
        world.update(delta);

        sketch.scale(Screen.zoom);

        Screen.draw();
        world.draw();
    };
});

window.onresize = () => {
    const zoomRatio = window.devicePixelRatio;
    p5Instance.resizeCanvas(
        window.innerWidth * zoomRatio,
        window.innerHeight * zoomRatio
    );
};

// Disable zoom using +/-
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
    }
});

// Disable zoom using scrollwheel
window.addEventListener(
    'wheel',
    (event) => {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    },
    { passive: false }
);
