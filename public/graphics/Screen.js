const Screen = {
    init(sketch) {
        Screen.sketch = sketch;
        const canvas = sketch.createCanvas(200, 200).elt;
        const context = canvas.getContext('2d');
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        // Setting density a tiny bit higher than 1 can resolves horizontal sprite issues
        // Vertical black bars still appear sometimes when walking
        // These can be seen when for example holding right and tapping left 2 times/s
        sketch.pixelDensity(1.001);
    },

    draw() {
        Screen.sketch.background(0);
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
