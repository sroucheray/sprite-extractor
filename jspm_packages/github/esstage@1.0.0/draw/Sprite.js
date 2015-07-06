/* */ 
import MovieClip from "esstage/base/MovieClip";
import ImageLoader from "esstage/utils/ImageLoader";

class Sprite extends MovieClip {
    constructor(url, framesParam){
        super();

        this.framesParam = framesParam;
        this.createFrames();
        let loader = new ImageLoader();
        loader.load(url).then((loader) => {
            this.images = loader.images;
        });
    }

    createFrames(){
        this.framesParam.forEach((frameParam, frameNum)=>{
            this.addFrameScript(frameNum, (stage, frameNum) => {
                this.currentFrameParam = frameParam;
                this.width = frameParam.width;
                this.height = frameParam.height;
            })
        });
    }

    draw(stage){
        let params = this.currentFrameParam;
        super.draw(stage);
        if(!this.images){
            return;
        }
        stage.ctx.drawImage(
            this.images[0],
            params.x, params.y, params.width, params.height,
            this.stageX - this.centerX, this.stageY - this.centerY, params.width, params.height);
    }
}


export default Sprite;