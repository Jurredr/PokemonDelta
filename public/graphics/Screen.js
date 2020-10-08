export class Graphics {
    constructor(sketch) {
        this.sketch = sketch;
    }

    image(img, x, y, width = img.width, height = img.height) {
        this.sketch.image(img, Math.floor(x), Math.floor(y), width, height);
    }

    image(
        img,
        dx,
        dy,
        dWidth,
        dHeight,
        sx,
        sy,
        sWidth = dWidth,
        sHeight = dHeight
    ) {
        this.sketch.image(
            img,
            Math.floor(dx),
            Math.floor(dy),
            dWidth + 0.3,
            dHeight + 0.2,
            Math.floor(sx) + 0.1,
            Math.floor(sy),
            sWidth - 0.2,
            sHeight
        );
    }
}

const Screen = {
    init(sketch) {
        Screen.sketch = sketch;
        Screen.graphics = new Graphics(sketch);
        const canvas = sketch.createCanvas(200, 200).elt;
        const context = canvas.getContext('2d');
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        sketch.pixelDensity(1);
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
