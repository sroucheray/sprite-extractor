import $ from "jquery";
import Backbone from "backbone";
import "bootstrap";
import rows from "modules/collections/rows";

let View = Backbone.View.extend({
    model: rows,
    el: document.querySelector(".sheet-rows"),
    initialize: function() {
        this.model.on("add", (row)=>{
            this.renderRow(row)
        });
        this.model.on("reset", (row)=>{
            this.removeRows(row)
        });
    },
    events: {
        "click .line": "clickLineHandler"
    },
    clickLineHandler: function(event){
        event.preventDefault();
    },
    removeRows:function(){
        this.$el.empty();
    },
    renderRow:function(row){
        let height = row.attributes.bottom - row.attributes.top;
        let $div = $("<a>").attr({
            href:"#",
            class:"line top",
            id: `line-top-${row.attributes.row}`,
            "data-line": `${row.attributes.row}`,
            "data-sticker": `${row.attributes.top}px \ height:${height}px \ row ${row.attributes.row}`,
            "data-toggle": "popover",
            "data-trigger": "focus",
            "data-placement": "top",
            "title": "Dismissible popover"
        }).css({
            top: `${row.attributes.top}px`,
            height: `1px`
        });
        let $div2 = $("<a>").attr({
            href:"#",
            class:"line bottom",
            id: `line-top-${row.attributes.row}`,
            "data-line": `${row.attributes.row}`,
            "data-sticker": `${row.attributes.bottom}px`,
            "data-toggle": "popover",
            "data-trigger": "focus",
            "data-placement": "bottom",
            "title": "Dismissible popover"
        }).css({
            top: `${row.attributes.bottom}px`,
            height: `1px`
        });
        $div.popover({
            content:()=>{
                console.log(arguments)
            }
        });
        $div2.popover();
        this.$el.append($div);
        this.$el.append($div2);
    },
    renderRowContent: function(){

    }
});


export default View;
