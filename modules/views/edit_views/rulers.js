import $ from "jquery";
import fileModel from "modules/models/file";

let offset = 150;
let topBarOffset = 52;
let $rulers = $(".ruler");
let $hRuler = $rulers.filter(".horizontal");
let $vRuler = $rulers.filter(".vertical");
let $corner = $(".rulers .corner");

export default function init(){
    updateRuler();

    fileModel.on("change:date", ()=>{
        console.log("update rulerds")
        updateRuler();
    });
};


function updateRuler() {
    $rulers.empty();
    let docWidth = $(document).width(),
        docHeight = $(document).height();
    $rulers.each(function() {
        let $ruler = $(this).empty(),
            isHorizontal = $ruler.hasClass("horizontal"),
            limit = isHorizontal ? docWidth - offset - 10 : docHeight - offset - topBarOffset - 10,
            item = $(document.createElement("li"));

        for (let i = -offset+10; i < limit; i+=10) {
            let text = "&nbsp;",
                clone = item.clone();
            if(i === 0){
                text = "0px";
                clone.addClass("big");
            }else if(i === 50){
                text = i;
                clone.addClass("big");
            }else if(i > 0  && i  % 100 === 0 /*&& (i < 1000 || isHorizontal)*/){
                text = i;
                clone.addClass("big");
            }else if(i > 1000 && i  % 100 === 0){

            }
            $ruler.append(clone.html(text));
        }
    });
}

$(window).scroll(function() {
    let left = $(window).scrollLeft();
    let top = $(window).scrollTop();
    $hRuler.add($corner).css("top", top < topBarOffset ? 0 : top - topBarOffset);
    $vRuler.add($corner).css("left", left);

});

$(window).resize(function(){
    updateRuler();
});
