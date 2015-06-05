import ImageLoader from "esstage/utils/ImageLoader";
import ImageClip from "esstage/draw/ImageClip";
import Rect from "esstage/draw/Rect";
import CanvasImage from "esstage/draw/CanvasImage";
import Stage from "esstage/Stage";





let canvas = document.getElementById("sprite");
let stage = new Stage(canvas);
let loader = new ImageLoader();
loader.load("/assets/sonic.png").then(()=>{
    let imageData = loader.imagesData()[0];

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    let image = new ImageClip(loader.images[0]);
    stage.addChild(image);

    var spriteWorker = new Worker("../../js/esstage/tools/spriteWorker.js");
    spriteWorker.postMessage({imageData: imageData});
    var datas = [];
    spriteWorker.onmessage = function(e){
        var data = e.data;
        datas.push(data);
        let div = document.createElement("div");

        div.setAttribute("style", `
            position:absolute;
            left : ${data.x}px;
            top : ${data.y}px;
            width : ${data.width}px;
            height : ${data.height}px;
            background-color : green;`);

        document.body.appendChild(div);
        /*var rect = new Rect(data);
        rect.fillStyle = "green";
        if(data.isBG){
            rect.fillStyle = "red";
        }
        stage.addChild(rect);*/
        //console.log(datas)
    }
});

