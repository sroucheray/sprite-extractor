import $ from "jquery";
import Backbone from "backbone";
import spriteSheet from "modules/collections/spritesheet";

let View = Backbone.View.extend({
    model: spriteSheet,
    el: document.querySelector(".sheet-rect"),
    initialize: function() {
        this.numSelected = 0;
        this.model.on("add", (rect)=>{
            this.renderRect(rect);
        });
        this.model.on("reset", (rect)=>{
            this.removeRects();
        });
        this.model.on("remove", (rect)=>{
            this.removeRect(rect);
        });
        this.model.on("change", (rect)=>{
            this.changeRect(rect);
        });
    },
    events: {
        "click .rect": "clickRectHandler"
    },
    clickRectHandler:function(event){
        let $rect = $(event.target);
        let rectModel = this.model.get($rect.data("id"));
        let selected = rectModel.has("selected") && rectModel.get("selected") ? false : true;
        rectModel.set("selected", selected);
    },
    updateRectViewFromModel:function($rectView, rectModel){
        $rectView.css({
            left: `${rectModel.attributes.x}px`,
            top: `${rectModel.attributes.y}px`,
            width: `${rectModel.attributes.width}px`,
            height: `${rectModel.attributes.height}px`,
            "z-index": spriteSheet.maxSize - rectModel.size
        }).data({
            "width":rectModel.attributes.width,
            "height":rectModel.attributes.height,
            "x": rectModel.attributes.x,
            "y": rectModel.attributes.y,
        }).toggleClass("hide", rectModel.has("show") && !rectModel.get("show"))
          .toggleClass("selected", rectModel.has("selected") && rectModel.get("selected"));
    },
    changeRect:function(rect){
        let id = `#rect-${rect.id}`;
        var $rect = this.$el.find(id);
        this.updateRectViewFromModel($rect, rect);
    },
    removeRect:function(rect){
        this.$el.find(`#rect-${rect.id}`).remove();
    },
    removeRects:function(){
        this.$el.empty();
    },
    renderRect:function(rect){
        let $rectView = $("<div>").attr({
            class:"rect",
            id: `rect-${rect.id}`,
            "data-id": rect.id,
            "data-line": `${rect.attributes.row}`
        });

        this.$el.append($rectView);

        this.updateRectViewFromModel($rectView, rect);
    }
});


let htGuide = $(".sheet-guides .horizontal-top");
let hbGuide = $(".sheet-guides .horizontal-bottom");
let vlGuide = $(".sheet-guides .vertical-left");
let vrGuide = $(".sheet-guides .vertical-right");
let hRuler = $(".ruler.horizontal");
let vRuler = $(".ruler.vertical");
let allguides = $(htGuide).add(hbGuide).add(vlGuide).add(vrGuide);

let rulersSize = {height: hRuler.height(), width: vRuler.width()};
let navHeight = 52;

let debounce;
$(".sheet-rect").on("mouseover", ".rect", function(){
    clearTimeout(debounce);
    allguides.removeClass("disappear");
    let $rect = $(this),
        width = $rect.width(),
        height = $rect.height(),
        position = $rect.offset(),
        data = $rect.data(),
        scrollTop = $(window).scrollTop(),
        scrollLeft = $(window).scrollLeft(),
        topOffset = scrollTop > navHeight ? 0 : navHeight,
        invertedTopOffset = scrollTop <= navHeight ? 0 : navHeight;

        let vGuidesHeight = position.top - scrollTop - rulersSize.height - topOffset;
        let vGuidesTop = scrollTop + rulersSize.height - invertedTopOffset;

        let hGuidesWidth = position.left - scrollLeft - rulersSize.width;
        let hGuiesLeft = scrollLeft + rulersSize.width;
        vlGuide.css({
            left: position.left,
            top: vGuidesTop,
            height: vGuidesHeight,
        }).attr("data-size", `${data.x}px`);

        vrGuide.css({
            left: position.left + width,
            top: vGuidesTop,
            height: vGuidesHeight
        }).attr("data-size", `width:${data.width}px`);

        htGuide.css({
            top: position.top - navHeight,
            left: hGuiesLeft,
            width: hGuidesWidth
        }).attr("data-size", `${data.y}px`);

        hbGuide.css({
            top: position.top + height - navHeight,
            left: hGuiesLeft,
            width: hGuidesWidth
        }).attr("data-size", `height: \ ${data.height}px`);

}).on("mouseout", ".rect", function(){
    debounce = setTimeout(function(){
        allguides.addClass("disappear");

    }, 200)
});


export default View;
