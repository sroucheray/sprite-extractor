/* */ 
import Clip from "esstage/base/Clip";
import requestAnimationFrameRate from "esstage/utils/FrameRate";

class MovieClip extends Clip {
    constructor(params, styles){
        super(params, styles);

        this.fps = 5;
        this.willUpdateFrame = true;
        this.frames = [];
        this.currentFrame = 0;
        this.playing = true;
    }

    requestFrameAtFPS(){
        this.willUpdateFrame = true;
        this.requestAnimationFrameAtFPS(this.requestFrameAtFPS.bind(this));
    }

    get fps() {
        return this._fps;
    }

    set fps(value) {
        this._fps = value;
        this.requestAnimationFrameAtFPS = requestAnimationFrameRate(value);
        this.requestAnimationFrameAtFPS(this.requestFrameAtFPS.bind(this));
    }

    stop(){
        this.playing = false;
    }

    play(){
        this.playing = true;
    }

    gotoAndPlay(frameNum){
        this.currentFrame = 0;
        this.playing = true;
    }

    gotoAndStop(frameNum){
        this.currentFrame = 0;
        this.playing = false;
    }

    addFrameScript(frameNum, func){
        if(frameNum > this.frames.length - 1){
            this.frames.fill(null, this.frames.length, frameNum);
        }

        this.frames[frameNum] = func;
    }

    updateFrame(stage){
        if(!this.willUpdateFrame){
            return;
        }
        this.willUpdateFrame = false;
        this.currentFrame++;
        if(this.currentFrame > this.frames.length - 1){
            this.currentFrame = 0;
        }

        if(typeof this.frames[this.currentFrame] === "function"){
            this.frames[this.currentFrame].call(this, stage, this.currentFrame);
        }
    }

    draw(stage){
        this.updateFrame(stage);
        super.draw(stage);
    }
}

export default MovieClip;