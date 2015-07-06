/* */ 
import Draw from "esstage/base/Draw";

class CanvasImage extends Draw {
    constructor(imageData, x = 0, y = 0, width = null, height = null){
        super();
        this.imageData = imageData;
        this.width = width || imageData.width;
        this.height = height || imageData.height;
        this.x = x;
        this.y = y;
    }


    * pixels() {
        let data = this.imageData.data;
        for (let i = 0; i < data; i += 4) {
            yield [
                data[i],
                data[i + 1],
                data[i + 2],
                data[i + 3],
            ];
        }
    }

    pixel(x, y, color) {
        let srcPixel = (y * this.imageData.width + x) * 4,
            data = this.imageData.data,
            r = data[srcPixel],
            g = data[srcPixel + 1],
            b = data[srcPixel + 2],
            a = data[srcPixel + 3];

        if(color){
            data[srcPixel] = color.r;
            data[srcPixel + 1] = color.g;
            data[srcPixel + 2] = color.b;
            data[srcPixel + 3] = color.a;

            return this;
        }

        return [
            r,
            g,
            b,
            a
        ];
    }

    draw(stage) {
        stage.ctx.putImageData(this.imageData, this.x, this.y);
        return this;
    }
}


export default CanvasImage;