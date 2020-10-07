const Screen = {
    init(sketch) {
        Screen.sketch = sketch;
        const canvas = sketch.createCanvas(200, 200).elt;
        let context = canvas.getContext('2d');
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        sketch.pixelDensity(1);
    },

    draw() {
        Screen.sketch.background(255, 0, 0);
    },

    scaledWidth() {
        return Screen.sketch.width / Screen.zoom;
    },

    scaledHeight() {
        return Screen.sketch.height / Screen.zoom;
    },

    zoom: 1.5,
};

export default Screen;
