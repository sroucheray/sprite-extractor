import PubSub from "esstage/utils/PubSub";

class SpriteAnalyser extends PubSub {
    constructor(imageData, params = {
        backgroundPixel: {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        },
        borders: {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        }
    }) {
        super();
        this.imageData = imageData;
        this.width = imageData.width;
        this.height = imageData.height;
        this.backgroundPixel = this.getPixel(0, 0); //params.backgroundPixel;
        this.results = [];
        this.borders = params.borders;

        //console.log(this.backgroundPixel)
    }

    isBackground(x, y) {
        let {
            r, g, b, a
        } = this.getPixel(x, y);
        return (
            r === this.backgroundPixel.r &&
            g === this.backgroundPixel.g &&
            b === this.backgroundPixel.b &&
            a === this.backgroundPixel.a);
        //return false;
    }

    isInRow(top, bottom, y, height) {
        let elementTop = y,
        elementBottom = y + height;

        return (elementTop >= top && elementTop < bottom) || (elementBottom >= top && elementBottom < bottom);
    }

    getPixel(x, y) {
        let srcPixel = this.getPosition(x, y);

        return {
            r: this.imageData.data[srcPixel],
            g: this.imageData.data[srcPixel + 1],
            b: this.imageData.data[srcPixel + 2],
            a: this.imageData.data[srcPixel + 3],
            position: srcPixel
        }
    }

    getCoordinates(length){
        return {
            x: (length / 4) % this.width,
            y: Math.floor((length / 4) / this.width)
        }
    }

    getPosition(x, y){
        return (y * this.width + x) * 4;
    }

    pixelEquals(p1, p2){
        return  p1.r === p2.r &&
                p1.g === p2.g &&
                p1.b === p2.b &&
                p1.a === p2.a;
    }

    analyse2() {
        this.visited = new Uint8Array(this.width * this.height * 4);
        this.results = [];
        let currentRow;
        let rowNum = 0;
        let numSpritesPerRow = 0;
        let id = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if(this.visited[this.getPosition(x, y)] !== 1 && !this.isBackground(x, y)){
                    let result = this.buildSprite2(x, y);

                    if (!currentRow) {
                        numSpritesPerRow = 0;
                        currentRow = {
                            top: result.y,
                            bottom: result.y + result.height
                        }
                    } else if (this.isInRow(currentRow.top, currentRow.bottom, result.y, result.y + result.height)) {
                        currentRow = {
                            top: Math.min(result.y, currentRow.top),
                            bottom: Math.max(result.y + result.height, currentRow.bottom)
                        }
                        numSpritesPerRow++;
                    } else {
                        currentRow.row = rowNum;
                        currentRow.numSprite = numSpritesPerRow;
                        numSpritesPerRow = 0;
                        this.trigger("row", currentRow);
                        currentRow = {
                            top: result.y,
                            bottom: result.y + result.height
                        }

                        rowNum++;
                    }

                    result.id = id;
                    result.row = rowNum;

                    this.trigger("sprite", result);
                    this.results.push(result);
                    id++;
                }
            }
        }

        currentRow.row = rowNum;
        this.trigger("row", currentRow);
        currentRow = {
            top: result.y,
            bottom: result.y + result.height
        }

        this.trigger("end");
    }

    buildSprite2(x, y){
        let dx = [0, -1, +1, 0];
        let dy = [-1, 0, 0, +1];

        let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
        let stack = [{x:x, y:y, position: this.getPosition(x, y)}];


        while (stack.length > 0) {
            let curPoint = stack.pop();
            minX = Math.min(minX, curPoint.x);
            minY = Math.min(minY, curPoint.y);

            maxX = Math.max(maxX, curPoint.x);
            maxY = Math.max(maxY, curPoint.y);

            this.visited[curPoint.position] = 1;

            for (let i = 0; i < 4; i++) {
                let nextPointX = curPoint.x + dx[i];
                let nextPointY = curPoint.y + dy[i];
                if (nextPointX < 0 || nextPointY < 0 || nextPointX >= this.width || nextPointY >= this.height) {
                    continue;
                }
                let nextPixel = this.getPixel(nextPointX, nextPointY);

                if (this.visited[nextPixel.position] !== 1 && !this.pixelEquals(nextPixel, this.backgroundPixel)){
                    stack.push({x:nextPointX, y:nextPointY, position: nextPixel.position});
                }
            }
        }

        return {
            x: minX,
            y: minY,
            width: maxX - minX + 1,
            height: maxY - minY + 1
        };
    }

    analyse() {
        this.results = [];
        let currentRow;
        let rowNum = 0;
        let id = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let existingResult = this.inExistingResult(x, y);
                if (existingResult) {
                    x = x + existingResult.width - 1
                    continue;
                }
                //console.log(x, y)
                if (this.isBackground(x, y)) {
                    //console.log("isbackground")
                    this.trigger("bg", {
                        x: x,
                        y: y,
                        width: 1,
                        height: 1
                    });
                } else {
                    //console.log("isforeground")
                    let result = this.buildSprite(x, y);

                    if (!currentRow) {
                        currentRow = {
                            top: result.y,
                            bottom: result.y + result.height
                        }
                    } else if (this.isInRow(currentRow.top, currentRow.bottom, result.y, result.y + result.height)) {
                        currentRow = {
                            top: Math.min(result.y, currentRow.top),
                            bottom: Math.max(result.y + result.height, currentRow.bottom)
                        }
                    } else {
                        currentRow.row = rowNum;
                        this.trigger("row", currentRow);
                        currentRow = {
                            top: result.y,
                            bottom: result.y + result.height
                        }

                        rowNum++;
                    }

                    result.id = id;
                    result.row = rowNum;

                    this.trigger("sprite", result);
                    this.results.push(result);
                    id++;
                }
            }
        }

        currentRow.row = rowNum;
        this.trigger("row", currentRow);
    }

    inExistingResult(x, y) {
        for (let result of this.results) {
            if (
                x >= result.x &&
                x < result.x + result.width &&
                y >= result.y &&
                y < result.y + result.height) {
                return result;
            }
        }
        //console.log("not is", x, y)

        return false;
    }

    isRowBackground(fromX, toX, y) {
        if (y <= 0 || y >= this.height - 1) {
            return true;
        }

        for (let x = fromX; x <= toX; x++) {
            if (!this.isBackground(x, y)) {
                return false
            }
        }

        return true;
    }

    isColBackground(fromY, toY, x) {
        if (x <= 0 || x >= this.width - 1) {
            return true;
        }

        for (let y = fromY; y <= toY; y++) {
            if (!this.isBackground(x, y)) {
                return false
            }
        }

        return true;
    }

    buildSprite(startX, startY, startWidth = 1, startHeight = 1, borders = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    }) {
        //console.log(startX, startY, startWidth, startHeight)
        let topRowIsBackground = this.isRowBackground(startX, startX + startWidth, startY);
        let bottomRowIsBackground = this.isRowBackground(startX, startX + startWidth, startY + startHeight);
        let leftColIsBackground = this.isColBackground(startY, startY + startHeight, startX);
        let rightColIsBackground = this.isColBackground(startY, startY + startHeight, startX + startWidth);

        if (!topRowIsBackground) {
            startY = startY - 1;
            startHeight = startHeight + 1;
        }

        if (!bottomRowIsBackground) {
            startHeight = startHeight + 1;
        }

        if (!leftColIsBackground) {
            startX = startX - 1;
            startWidth = startWidth + 1;
        }

        if (!rightColIsBackground) {
            startWidth = startWidth + 1;
        }

        startX = Math.max(0, startX);
        startY = Math.max(0, startY);
        //TODO: improve those limit
        startWidth = Math.min(startWidth, this.width);
        startHeight = Math.min(startHeight, this.height);
        //console.log(startX, startY, startWidth, startHeight, `(${this.width}, ${this.height})`)

        let hasBackgroundBorder = (topRowIsBackground && bottomRowIsBackground && leftColIsBackground && rightColIsBackground);
        //let isFullArea = (startX === 0 && startWidth >= this.width && startY === 0 && startHeight >= this.height);
        //console.log(startX, startY, topRowIsBackground , bottomRowIsBackground , leftColIsBackground , rightColIsBackground)
        if (hasBackgroundBorder /*|| isFullArea*/ ) {
            if (
                borders.top === this.borders.top &&
                borders.right === this.borders.right &&
                borders.bottom === this.borders.bottom &&
                borders.left === this.borders.left
            ) {
                return {
                    x: startX,
                    y: startY,
                    width: startWidth,
                    height: startHeight
                };
            }

            if (this.borders.top > borders.top) {
                borders.top++;
                startY = startY - 1;
                startHeight = startHeight + 1;
            }

            if (this.borders.left > borders.left) {
                borders.left++;
                startX = startX - 1;
                startWidth = startWidth + 1;
            }

            if (this.borders.bottom > borders.bottom) {
                borders.bottom++;
                startHeight = startHeight + 1;
            }

            if (this.borders.right > borders.right) {
                borders.right++;
                startWidth = startWidth + 1;
            }
        }

        return this.buildSprite(startX, startY, startWidth, startHeight, borders);
    }
}

export
default SpriteAnalyser;