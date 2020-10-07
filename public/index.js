import p5 from 'p5';

import Screen from './graphics/Screen';
import Tileset from './graphics/Tileset';

import res from 'res/**/*.*';

var outside;

const p5Instance = new p5((sketch) => {
    sketch.setup = () => {
        Screen.init(sketch);

        window.onresize();

        outside = new Tileset(res.img.outside.png, 32, 32);
    };

    sketch.draw = () => {
        Screen.draw();

        outside.drawTile(10, 10, 1, 0);
    };
});

window.onresize = () => {
    p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
};
