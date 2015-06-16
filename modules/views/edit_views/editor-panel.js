import $ from "jquery";
import Backbone from "backbone";
import fileModel from "modules/models/file";
import spriteSheet from "modules/collections/spritesheet";
import Stage from "esstage/Stage";
import ImageClip from "esstage/draw/ImageClip";

let View = Backbone.View.extend({
    model: fileModel,
    el: document.querySelector(".editor-panel"),
    initialize:function(){
        spriteSheet.on("change:selected", ()=>{
            let $fieldset = this.$el.find("#selectionForm fieldset");
            $fieldset.attr("disabled", !spriteSheet.numSelected);

            let $overlapping = $fieldset.find(".merge-overlapping");
            let $selected = $fieldset.find(".merge-selected");

            if(spriteSheet.numSelected === 1){
                $selected.addClass("hide");
                $overlapping.removeClass("hide");
            }
            if(spriteSheet.numSelected > 1){
                $selected.removeClass("hide");
                $overlapping.addClass("hide");
            }
        });
    },
    events: {
        "change input[name=spriteSheetStyle]": "changeSpriteSheetStyleHandler",
        "click #selectionForm button": "mergeHandler"
    },
    changeSpriteSheetStyleHandler: function(event){
        this.model.set("displayStyle", $(event.target).val());
    },
    mergeHandler: function(){
        spriteSheet.merge();
    }
});


export default View;
