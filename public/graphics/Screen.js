class Graphics {
    constructor({
        canvas = document.createElement('canvas'),
        parentElementQuery = 'body',
        doResize = true,
    }) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.doResize = doResize;
        if (parentElementQuery) {
            this.setParentElementFromQuery(parentElementQuery);
        }
        const G = this;
        this.camera = {
            fov: 200,
            scaledWidth: () =>
                (G.camera.fov * G.canvas.width) / G.canvas.height,
            scaledHeight: () => G.camera.fov,
            x: 0,
            y: 0,
            target: null,
            offsetX: 0,
            offsetY: 0,
            set scale(value) {
                G.ctx.resetTransform();
                G.ctx.scale(value, value);
                G.ctx.imageSmoothingEnabled = false;
            },
            get scale() {
                return G.camera.fov / canvas.height;
            },
        };
    }
    destructor() {
        this.doResize = false;
        this.parentElement.removeChild(canvas);
    }
    updateCamera(camera) {
        Object.assign(this.camera, camera);
        this.camera.scale = this.canvas.height / this.camera.fov;
        this.camera.offsetX =
            -this.camera.x +
            (0.5 * this.camera.fov * this.canvas.width) / this.canvas.height;
        this.camera.offsetY = -this.camera.y + 0.5 * this.camera.fov;
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
        this.ctx.fillRect(dx + offsetX, dy + offsetY, dWidth, dHeight);
        if (style !== '') {
            this.fillStyle = lastStyle;
        }
    }
    strokeRect(dx, dy, dWidth, dHeight, style = '') {
        let lastStyle;
        if (style !== '') {
            lastStyle = this.strokeStyle;
            this.strokeStyle = style;
        }
        const { offsetX, offsetY } = this.camera;
        this.ctx.strokeRect(dx + offsetX, dy + offsetY, dWidth, dHeight);
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
                Math.ceil(dWidth),
                Math.ceil(dHeight)
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

    thisOnParentResize = () => this.onParentResize();
    onParentResize() {
        let width, height;
        if (this.parentElement === document.body) {
            width = window.innerWidth;
            height = window.innerHeight;
        } else {
            width = this.parentElement.clientWidth;
            height = this.parentElement.clientHeight;
        }
        this.canvas.height = this.camera.fov;
        this.canvas.width = Math.ceil((this.camera.fov * width) / height);
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
