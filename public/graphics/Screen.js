class Graphics {
    constructor ({
        canvas = document.createElement("canvas"),
        parentElementQuery = "body",
        doResize = true,
        pixelsPerUnit = 1
    }){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.doResize = doResize;
        if (parentElementQuery){
            this.setParentElementFromQuery(parentElementQuery);
        }
        this.camera = {
            fov: 200,
            x: 0,
            y: 0,
            target: null,
            offsetX:0,
            offsetY:0,
            scale:1,
            pixelsPerUnit
        };
        
    }
    destructor(){
        this.doResize = false;
        this.parentElement.removeChild(canvas);
    }
    updateCamera(camera){
        Object.assign(this.camera, camera);
        this.camera.canvasScale = this.pixelsPerUnit * this.camera.fov / this.canvas.height;
        this.camera.offsetX = this.camera.x - (0.5 * this.camera.fov * this.canvas.width) / this.canvas.height;
        this.camera.offsetY = this.camera.y - 0.5 * this.camera.fov;
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
    fillRect(dx,dy,dWidth,dHeight, style=''){
        let lastStyle;
        if (style !== ''){
            lastStyle = this.fillStyle;
            this.fillStyle = style;
        }
        const {offsetX, offsetY, scale} = this.camera;
        this.ctx.fillRect(
            scale * (dx + offsetX),
            scale * (dy + offsetY),
            dWidth,
            dHeight
        );
        if (style !== ''){
            this.fillStyle = lastStyle;
        }
    }
    strokeRect(dx,dy,dWidth,dHeight,style=''){
        let lastStyle;
        if (style !== ''){
            lastStyle = this.strokeStyle;
            this.strokeStyle = style;
        }
        const {offsetX, offsetY, scale} = this.camera;
        this.ctx.strokeRect(
            scale * (dx + offsetX),
            scale * (dy + offsetY),
            dWidth,
            dHeight
        );
        if (style !== ''){
            this.strokeStyle = lastStyle;
        }
    }
    rect(dx,dy, dWidth, dHeight, fillStyle, strokeStyle){
        this.fillRect(dx, dy, dWidth, dHeight, fillStyle);
        this.strokeRect(dx, dy, dWidth, dHeight, strokeStyle);
    }
    set fillStyle(value){this.ctx.fillStyle = value;}
    get fillStyle(){return this.ctx.fillStyle;}
    set strokeStyle(value){this.ctx.strokeStyle = value;}
    get strokeStyle(){return this.ctx.strokeStyle;}
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
    ){
        const {offsetX, offsetY, scale, pixelsPerUnit} = this.camera;
        if (sx ?? sy === undefined){
            this.ctx.drawImage(
                img,
                scale * (dx + offsetX),
                scale * (dy + offsetY),
                dWidth,
                dHeight
            );
        } else {
            
            console.log(img,
                sx, sy, sWidth, sHeight,
                scale * (dx + offsetX),
                scale * (dy + offsetY),
                scale * dWidth*pixelsPerUnit,
                scale * dHeight*pixelsPerUnit)
            this.ctx.drawImage(
                img,
                sx, sy, sWidth, sHeight,
                scale * (dx + offsetX),
                scale * (dy + offsetY),
                scale * dWidth*pixelsPerUnit,
                scale * dHeight*pixelsPerUnit
            );
        }
    }
    set parentElement(element){
        element.appendChild(this.canvas);
        this.onParentResize()
    }
    get parentElement(){
        return this.canvas.parentElement;
    }
    setParentElementFromQuery(query){
        /** @type {HTMLElement} */
        const element = document.querySelector(query);
        if(element){
            this.parentElement = element;
        } else {
            window.addEventListener("load", () => { this.parentElement = document.querySelector(query); } );
        }
    }

    doResizeValue = false;
    set doResize(value){
        if (value === this.doResizeValue)return;
        if (value){
            window.addEventListener("resize", this.thisOnParentResize );
        } else {
            window.removeEventListener("resize", this.thisOnParentResize );
        }
        this.doResizeValue = value;
    }
    
    thisOnParentResize = () => this.onParentResize();
    onParentResize(){
        if (this.parentElement === document.body){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        } else {
            this.canvas.width = this.parentElement.clientWidth;
            this.canvas.height = this.parentElement.clientHeight;
        }
    }
}
const Screen = {
    Graphics,
    main: null,//new Graphics({}),
    init(graphics){this.main = graphics;}
}

export default Screen;
