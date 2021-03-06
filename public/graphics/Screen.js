import p5 from 'p5'
export class Graphics {
    /**
     * 
     * @param {p5} sketch 
     */
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
            dx,
            dy,
            dWidth,
            dHeight,
            sx,
            sy,
            sWidth,
            sHeight
        );
    }
}

const Screen = {
    /** @type {p5} */
    sketch:undefined,
    /**
     * 
     * @param {p5} sketch 
     */
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
