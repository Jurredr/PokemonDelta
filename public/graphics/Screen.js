class Graphics {
    constructor({
        canvas = document.createElement('canvas'),
        parentElementQuery = 'body',
        doResize = true,
        windowWidth = 600,
        windowHeight = 400
    }) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.doResize = doResize;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        if (parentElementQuery) {
            this.setParentElementFromQuery(parentElementQuery);
        }
        const G = this;
        this.camera = {
            x: 0,
            y: 0,
            follow: null,
            fov: 200,
            scaledWidth : () => G.canvas.width,
            scaledHeight: () => G.canvas.height,
            offsetX: 0,
            offsetY: 0
        };
    }
    destructor() {
        this.doResize = false;
        this.parentElement.removeChild(canvas);
    }
    updateCamera(camera) {
        Object.assign(this.camera, camera);
        this.canvas.height = this.camera.fov;
        this.canvas.width = this.camera.fov*this.windowWidth/this.windowHeight;
        this.camera.offsetX = -this.camera.x + 0.5 * this.canvas.width;
        this.camera.offsetY = -this.camera.y + 0.5 * this.canvas.height;
    }


    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    fillRect(dx, dy, dWidth, dHeight, style = '') {
        let lastStyle;
        if (style !== '') {
            lastStyle = this.fillStyle;
            this.fillStyle = style;
        }
        const { offsetX, offsetY } = this.camera;
        this.ctx.fillRect(
            Math.trunc(dx + offsetX),
            Math.trunc(dy + offsetY),
            Math.trunc(dWidth),
            Math.trunc(dHeight)
        );
        if (style !== '') {
            this.fillStyle = lastStyle;
        }
    }
    strokeRect(dx, dy, dWidth, dHeight, style = '') {
        let lastStyle;
        if (style !== '') {
            [lastStyle, this.strokeStyle] = [this.strokeStyle, style];
        }
        const { offsetX, offsetY } = this.camera;
        this.ctx.strokeRect(
            Math.trunc(dx + offsetX),
            Math.trunc(dy + offsetY),
            Math.trunc(dWidth),
            Math.trunc(dHeight)
        );
        if (style !== '') {
            this.strokeStyle = lastStyle;
        }
    }
    rect(dx, dy, dWidth, dHeight, fillStyle, strokeStyle) {
        this.fillRect(dx, dy, dWidth, dHeight, fillStyle);
        this.strokeRect(dx, dy, dWidth, dHeight, strokeStyle);
    }
    set fillStyle(value) {
        this.ctx.fillStyle = value;
    }
    get fillStyle() {
        return this.ctx.fillStyle;
    }
    set strokeStyle(value) {
        this.ctx.strokeStyle = value;
    }
    get strokeStyle() {
        return this.ctx.strokeStyle;
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
        const { offsetX, offsetY } = this.camera;
        if (sx == undefined && sy == undefined) {
            this.ctx.drawImage(
                img,
                dx + offsetX,
                dy + offsetY,
                dWidth,
                dHeight
            );
        } else {
            this.ctx.drawImage(
                img,
                sx,
                sy,
                sWidth,
                sHeight,
                Math.trunc(dx + offsetX),
                Math.trunc(dy + offsetY),
                dWidth,
                dHeight
            );
        }
    }
    set parentElement(element) {
        element.appendChild(this.canvas);
        this.onParentResize();
    }
    get parentElement() {
        return this.canvas.parentElement;
    }
    setParentElementFromQuery(query) {
        /** @type {HTMLElement} */
        const element = document.querySelector(query);
        if (element) {
            this.parentElement = element;
        } else {
            window.addEventListener('load', () => {
                this.parentElement = document.querySelector(query);
            });
        }
    }

    doResizeValue = false;
    set doResize(value) {
        if (value === this.doResizeValue) return;
        if (value) {
            window.addEventListener('resize', this.thisOnParentResize);
        } else {
            window.removeEventListener('resize', this.thisOnParentResize);
        }
        this.doResizeValue = value;
    }
    get doResize(){return this.doResizeValue;}

    thisOnParentResize = () => this.onParentResize();
    onParentResize() {
        if (this.parentElement === document.body) {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
        } else {
            this.windowWidth = this.parentElement.clientWidth;
            this.windowHeight = this.parentElement.clientHeight;
        }
        this.updateCamera({});
    }
}
const Screen = {
    Graphics,
    /** @type {Graphics} */
    main: null, //new Graphics({}),
    init(graphics) {
        this.main = graphics;
    },
};

export default Screen;
