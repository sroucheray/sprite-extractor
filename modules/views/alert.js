import $ from "jquery";
import Backbone from "backbone";
import "bootstrap";
import spriteSheet from "modules/collections/spritesheet";
import rows from "modules/collections/rows";

let View = Backbone.View.extend({
    spriteModel: spriteSheet,
    rowModel: rows,
    el: document.querySelector(".alerts"),
    events:{
        "click button": "filterSmallSprites"
    },
    initialize: function() {
        this.$alert1 = this.$el.find(".alert").first();
        this.$alert2 = this.$el.find(".alert").last();
        console.log(this.$alert1, this.$alert2)
        this.spriteModel.on("add", (rect)=>{
            this.render(rect)
        });
        this.spriteModel.on("end", (rect)=>{
            this.render(rect, true)
        });
    },
    filterSmallSprites(event){
        event.preventDefault();
        let width = this.$el.find(".width").val() || 0;
        let height = this.$el.find(".height").val() || 0;
        this.spriteModel.forEach(function(rect){
            if(rect.get("width") < width || rect.get("height") < height){
                rect.set("show", false);
            }else{
                rect.set("show", true);
            }
        });

        let num = this.spriteModel.numVisible();

        console.log(this.spriteModel.rowsVisible());

        this.$alert2.find(".message").html(`<strong>${num}</strong> sprites found. Small ones can be artefacts, you can filter them.`);
    },
    render(rect, end){
        //this.spriteModel.length
        if(end){
            this.$alert1.addClass("hide");
            this.$alert2.removeClass("hide").find(".message").html(`<strong>${this.spriteModel.length}</strong> sprites found. Small ones can be artefacts, you can filter them.`);
            return;
        }
        this.$alert1.removeClass("hide").html(`<strong>Analysing sprite sheet</strong> ${this.spriteModel.length} sprites so far...`);
        this.$alert2.addClass("hide");
    }
});


export default View;
