/* */ 
import CanvasImage from "esstage/draw/CanvasImage";
import Clip from "esstage/base/Clip";

class Stage extends Clip{
    constructor(canvas){
        super();

        this.children = [];
        this.canvas = canvas;
        this.on("update", ()=>{
            this.requestAnimationFrame();
        });
    }

    get width(){
        return this.canvas.width;
    }

    set width(value) {
        super.width = value;
        if(this.canvas){
            this.canvas.width = value;
        }
    }

    get height() {
        return this.canvas.height;
    }

    set height(value) {
        super.height = value;
        if(this.canvas){
            this.canvas.height = value;
        }
    }

    get stageX(){
        return 0;
    }

    get stageY(){
        return 0;
    }

    image(){
        return this.requestAnimationFrame().then(() => {
            return new CanvasImage(this.ctx.getImageData(0, 0, this.width, this.height));
        });
    }

    getImageData(){
        return this.requestAnimationFrame().then(() => {
            return this.ctx.getImageData(0, 0, this.width, this.height);
        });
    }

    requestAnimationFrame(){
        window.cancelAnimationFrame(this._paintRequest);
        return new Promise((resolve) => {
            this._paintRequest = window.requestAnimationFrame(() => {
                this.draw();
                resolve();
            });
        });
    }

    set canvas(canvas){
        this._canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    get canvas(){
        return this._canvas;
    }

    get ctx(){
        return this.context;
    }

    addChild(child){
        child.on("update", ()=>{
            this.requestAnimationFrame();
        });

        super.addChild(child);
    }

    beforeRender(child){
        this.ctx.save();
    }

    afterRender(child){
        this.ctx.restore();
    }

    draw(stage){
        this.ctx.clearRect(0, 0, this.width, this.height);
        if(this.visible){
            super.draw(this);
        }
    }
}

export default Stage;