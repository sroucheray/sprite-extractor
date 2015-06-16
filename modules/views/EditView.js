import CanvasView from "modules/views/edit_views/canvas";
import updateRulers from "modules/views/edit_views/rulers";
import SheetRect from "modules/views/edit_views/sheetrects";
import SheetRows from "modules/views/edit_views/sheetrows";
import EditorPanel from "modules/views/edit_views/editor-panel";


import fileModel from "modules/models/file";
import spriteSheet from "modules/collections/spritesheet";
import rows from "modules/collections/rows";



export default ()=>{
    let canvasView = new CanvasView();
    let editorPanel = new EditorPanel();
    updateRulers();

    let stage = canvasView.stage;
    let spriteWorker = new Worker("/modules/workers/spriteWorker.js");
    let sheetRect = new SheetRect();
    let sheetRows = new SheetRows({
        stage: stage
    });
    spriteWorker.onmessage = function(e){
        let data = e.data;
        if(data.type === "rect"){
            spriteSheet.add(data.data);
        }
        if(data.type === "row"){
            rows.add(data.data);
        }
        if(data.type === "end"){
            spriteSheet.trigger("end")
        }
    }

    fileModel.on("change:date", function(){
        spriteSheet.reset();
        rows.reset();
        stage.getImageData().then(function(imageData){
            spriteWorker.postMessage({imageData: imageData});
            sheetRows.$el.css({
                width: imageData.width
            });
        });
    });

};
