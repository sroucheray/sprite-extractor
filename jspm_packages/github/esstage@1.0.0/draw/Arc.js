/* */ 
import Draw from "esstage/base/Draw";

class Arc extends Draw {
    constructor(params = {
        x: 0,
        y: 0,
        radius: 10,
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
    }, styles, fill = true) {
        super(params, styles);
        this.fill = fill;
    }

    draw(stage) {
        super.draw(stage);
        stage.ctx.beginPath();
        stage.ctx.arc(this.stageX, this.stageY, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
        this.fill ? stage.ctx.fill() : stage.ctx.stroke();
    }
}

export default Arc;