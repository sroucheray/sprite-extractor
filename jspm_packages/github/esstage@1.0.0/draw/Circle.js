/* */ 
import Arc from "esstage/draw/Arc";

class Circle extends Arc {
    constructor(params = { x: 0, y: 0, radius: 10 }, styles, fill = true){
        super(undefined, styles, fill);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(stage) {
        super.draw(stage);
    }
}


export default Circle;