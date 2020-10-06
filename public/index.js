import p5 from 'p5';

import Screen from './Screen';

const p5Instance = new p5((sketch) => {
    sketch.setup = () => {
        Screen.init(sketch);

        window.onresize();
    };

    sketch.draw = () => {
        Screen.draw(sketch);
    };
});

window.onresize = () => {
    p5Instance.resizeCanvas(window.innerWidth, window.innerHeight);
};
