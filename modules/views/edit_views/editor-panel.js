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
        let selectionHeading = this.$el.find(".selection-heading");
        let spriteHeading = this.$el.find(".sprite-heading");
        spriteSheet.on("change:selected change:visible add remove", ()=>{
            let $fieldset = this.$el.find("#selectionForm fieldset"),
                numSelected = spriteSheet.selected().length;
            $fieldset.attr("disabled", !numSelected);

            let $overlapping = $fieldset.find(".merge-overlapping");
            let $selected = $fieldset.find(".merge-selected");

            if(numSelected === 0){
                selectionHeading.text("No sprite selected");
            }else if(numSelected === 1){
                $selected.find("button").attr("disabled", true);
                $overlapping.find("button").attr("disabled", null);
                selectionHeading.text("1 sprite selected");
            }else if(numSelected > 1){
                $selected.find("button").attr("disabled", null);
                $overlapping.find("button").attr("disabled", true);

                selectionHeading.text(`${numSelected} sprites selected`);
            }
        });

        spriteSheet.on("update_visibility", ()=>{
            let visibles = spriteSheet.numVisible;
            if(visibles === 0){
                spriteHeading.text(`No sprite found`);
            }else if(visibles === 1){
                spriteHeading.text(`1 sprite found`);
            }else {
                spriteHeading.text(`${visibles} sprites found`);
            }
        })

        fileModel.on("change:maxID change:maxSize change:maxWidth change:maxHeight", ()=>{
            this.$el.find("#narrower").val(fileModel.get("maxWidth")).attr("max", fileModel.get("maxWidth"));
            this.$el.find("#smaller").val(fileModel.get("maxHeight")).attr("max", fileModel.get("maxHeight"));

            this.$el.find("#wider").val(fileModel.get("minWidth")).attr("min", fileModel.get("minWidth"));
            this.$el.find("#taller").val(fileModel.get("minHeight")).attr("min", fileModel.get("minHeight"));

            this.$el.find("#lessthanpixels").val(fileModel.get("maxSize")).attr("max", fileModel.get("maxSize"));
            this.$el.find("#morethanpixels").val(fileModel.get("minSize")).attr("min", fileModel.get("minSize"));
        });

        fileModel.on("change:maxSize", ()=>{
            this.$el.css("z-index", fileModel.get("maxSize"));
        });
    },
    events: {
        "change input[name=spriteSheetStyle]": "changeSpriteSheetStyleHandler",
        "click #selectionForm .merge-overlapping button": "mergeHandler",
        "click #selectionForm .merge-selected button": "mergeHandler",
        "click #selectionForm .remove-selected button":"removeHandler",
        "change input[type=number]": "filter"
    },
    changeSpriteSheetStyleHandler: function(event){
        this.model.set("displayStyle", $(event.target).val());
    },
    mergeHandler: function(){
        spriteSheet.merge();
    },
    removeHandler: function(){
        spriteSheet.removeSelection();
    },
    filter:function(){
        let narrower = $("#narrower").val();
        let wider = $("#wider").val();
        let taller = $("#taller").val();
        let smaller = $("#smaller").val();
        let morethanpixels = $("#morethanpixels").val();
        let lessthanpixels = $("#lessthanpixels").val();

        spriteSheet.filterOnSize(wider, narrower, taller, smaller, morethanpixels, lessthanpixels);
    }
});


export default View;
