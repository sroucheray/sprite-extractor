/* */ 
import Draw from "esstage/base/Draw";

class Rect extends Draw {
    constructor(params = {
        x: 0,
        y: 0,
        width: 10,
        height: 10
    }, styles, fill = true) {
        super(params, styles);
        this.fill = fill;
    }

    draw(stage) {
        super.draw(stage);
        stage.ctx.beginPath();
        stage.ctx.rect(this.stageX, this.stageY, this.width, this.height);
        this.fill ? stage.ctx.fill() : stage.ctx.stroke();
    }
}

export default Rect;