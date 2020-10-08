export class Graphics {
    constructor(sketch) {
        this.sketch = sketch;
    }

    image(img, x, y, width = -1, height = -1) {
        width = width == -1 ? img.width : width;
        height = height == -1 ? img.height : height;

        this.sketch.image(
            img,
            Math.floor(x),
            Math.floor(y),
            width + 0.1,
            height + 0.1
        );
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
            dWidth + 0.1,
            dHeight + 0.1,
            Math.floor(sx),
            Math.floor(sy),
            sWidth,
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
