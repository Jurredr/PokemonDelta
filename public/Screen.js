var canvas;

const Screen = {
    init(sketch) {
        canvas = sketch.createCanvas(200, 200);
        sketch.pixelDensity(1);
    },

    draw(sketch) {
        sketch.background(255, 0, 0);
    },
};

export default Screen;
