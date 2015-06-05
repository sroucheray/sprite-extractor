import $ from "jquery";
import Backbone from "backbone";
import "bootstrap";
import spriteSheet from "modules/collections/spritesheet";
import rows from "modules/collections/rows";

let View = Backbone.View.extend({
    spriteModel: spriteSheet,
    rowModel: rows,
    el: document.querySelector(".sheet-rect"),
    initialize: function() {
        this.spriteModel.on("add", (rect)=>{
            this.renderRect(rect)
        });
        this.rowModel.on("add", (row)=>{
            this.renderRow(row)
        });
    },
    events: {
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    },
    renderRect:function(rect){

        let $div = $("<div>").attr({
            class:"rect",
            id: `rect-${rect.id}`,
            "data-line": `${rect.attributes.row}`
        }).css({
            left: `${rect.attributes.x}px`,
            top: `${rect.attributes.y}px`,
            width: `${rect.attributes.width}px`,
            height: `${rect.attributes.height}px`
        });

        this.$el.append($div);
    },
    renderRow:function(row){
        let height = row.attributes.bottom - row.attributes.top;
        let $div = $("<div>").attr({
            class:"line top",
            id: `line-top-${row.attributes.row}`,
            "data-line": `${row.attributes.row}`,
            "data-toggle": "popover",
            "data-trigger": "focus",
            "title": "Dismissible popover",
            "data-content": "And here's some amazing content. It's very engaging. Right?"
        }).css({
            top: `${row.attributes.top}px`,
            height: `${height}px`
        });
        $div.popover();
        this.$el.append($div);
/*
        let $div2 = $("<div>").attr({
            class:"line bottom",
            id: `line-bottom-${row.attributes.row}`,
            "data-line": `${row.attributes.row}`
        }).css({
            top: `${row.attributes.bottom}px`,
            height: `1px`
        });*/

        //this.$el.append($div2);
    }
});


export default View;
