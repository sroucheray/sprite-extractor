import $ from "jquery";
import BodyView from "modules/views/body";
import CanvasView from "modules/views/canvas";
import SheetRect from "modules/views/sheetrect";
import Output from "modules/views/output";

import file from "modules/models/file";
import spriteSheet from "modules/collections/spritesheet";
import rows from "modules/collections/rows";


$(function(){
    let bodyView = new BodyView();
    let canvasView = new CanvasView();
    let output = new Output();
    file.on("change:image", function(){
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let img = file.get("image");
        output.src = img.src;
        let sheetRect = new SheetRect();
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0 );
        let myData = context.getImageData(0, 0, img.width, img.height);

        let spriteWorker = new Worker("/modules/workers/spriteWorker.js");
        spriteWorker.postMessage({imageData: myData});
        spriteWorker.onmessage = function(e){
            let data = e.data;
            if(data.type === "rect"){
                spriteSheet.add(data.data);
            }
            if(data.type === "row"){
                rows.add(data.data);
            }
        }
    });
});