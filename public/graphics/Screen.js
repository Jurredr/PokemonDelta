var canvas;

const Screen = {
    init(sketch) {
        Screen.sketch = sketch;
        canvas = sketch.createCanvas(200, 200);
        sketch.pixelDensity(1);
    },

    draw() {
        Screen.sketch.background(255, 0, 0);
    },
};

export default Screen;
