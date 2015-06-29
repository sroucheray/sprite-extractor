import $ from "jquery";
import "bootstrap";
import initHomeView from "modules/views/HomeView";
import initEditView from "modules/views/EditView";
import initCSSView from "modules/views/CSSView";

/*import BodyView from "modules/views/body";
import CanvasView from "modules/views/canvas";
import SheetRect from "modules/views/sheetrects";
import SheetRows from "modules/views/sheetrows";
import Output from "modules/views/output";
import Alert from "modules/views/alert";
import Home from "modules/views/home";

import {updateRuler} from "modules/views/rulers";

import ImageClip from "esstage/draw/ImageClip";*/

$(function(){
    initHomeView();
    initEditView();
    initCSSView();

    $(".navbar a:first").tab("show");

    $(".navbar a").on("shown.bs.tab", event=>{
        $("body").toggleClass("checker", $(event.currentTarget).attr("href") === "#edit");
    })


    /*let bodyView = new BodyView();*/
   /* let homeView = new Home();*/
/*    let canvasView = new CanvasView();
    let alertView = new Alert();
    let imageClip;
    //let output = new Output();
    let sheetRect = new SheetRect();
    let sheetRows = new SheetRows({
        stage: stage
    });
    updateRuler();

    let spriteWorker = new Worker("/modules/workers/spriteWorker.js");
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

    file.on("change:url", function(){
        spriteSheet.reset();
        rows.reset();
        stage.getImageData().then(function(imageData){
            spriteWorker.postMessage({imageData: imageData});
            sheetRows.$el.css({
                width: imageData.width
            });
        });
        updateRuler();
    });


    let htGuide = $(".sheet-guides .horizontal-top");
    let hbGuide = $(".sheet-guides .horizontal-bottom");
    let vlGuide = $(".sheet-guides .vertical-left");
    let vrGuide = $(".sheet-guides .vertical-right");
    let hRuler = $(".ruler.horizontal");
    let vRuler = $(".ruler.vertical");
    let rulersSize = {height: hRuler.height(), width: vRuler.width()};
    $(".sheet-rect").on("mouseover", ".rect", function(){
        let $rect = $(this),
            width = $rect.width(),
            height = $rect.height(),
            position = $rect.offset(),
            data = $rect.data(),
            scrollTop = $(window).scrollTop(),
            scrollLeft = $(window).scrollLeft();

            vlGuide.css({
                left: position.left,
                top: scrollTop + rulersSize.height,
                height: position.top - scrollTop - rulersSize.height,
            }).attr("data-size", `x:${data.x}px`);

            vrGuide.css({
                left: position.left + width,
                top: scrollTop + rulersSize.height,
                height: position.top - scrollTop - rulersSize.height
            }).attr("data-size", `width:${data.width}px`);

            htGuide.css({
                top: position.top,
                left: scrollLeft + rulersSize.width,
                width: position.left - scrollLeft - rulersSize.width
            }).attr("data-size", `y:${data.y}px`);

            hbGuide.css({
                top: position.top + height,
                left: scrollLeft + rulersSize.width,
                width: position.left - scrollLeft - rulersSize.width
            }).attr("data-size", `height:${data.height}px`);

    }).on("mouseout", ".rect", function(){
        vlGuide.css({
            "left": 0
        }).attr("data-size", "");
        vrGuide.css({
            "left": 0
        }).attr("data-size", "");
        htGuide.css({
            "top": 0
        }).attr("data-size", "");
        hbGuide.css({
            "top": 0
        }).attr("data-size", "");
    });*/

/*    $(window).scroll(function() {
        let left = $(window).scrollLeft();
        let top = $(window).scrollTop();
        hRuler.css("top", top);
        vRuler.css("left", left);

    });

    $(window).resize(function(){
        updateRuler();
    })*/
});
