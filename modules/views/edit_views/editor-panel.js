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
        spriteSheet.on("change:selected add remove", ()=>{
            let $fieldset = this.$el.find("#selectionForm fieldset"),
                numSelected = spriteSheet.selected().length;
            $fieldset.attr("disabled", !numSelected);

            let $overlapping = $fieldset.find(".merge-overlapping");
            let $selected = $fieldset.find(".merge-selected");

            if(numSelected === 1){
                $selected.find("button").attr("disabled", true);
                $overlapping.find("button").attr("disabled", null);
            }
            if(numSelected > 1){
                $selected.find("button").attr("disabled", null);
                $overlapping.find("button").attr("disabled", true);
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
