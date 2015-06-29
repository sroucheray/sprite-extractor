import $ from "jquery";
import Backbone from "backbone";
import fileModel from "modules/models/file";
import Stage from "esstage/Stage";
import ImageClip from "esstage/draw/ImageClip";

let View = Backbone.View.extend({
    model: fileModel,
    el: document.querySelector("canvas.sprite"),
    initialize: function() {
        this.stage = new Stage(this.el);
        this.model.on("change:date", ()=>{

            $('.navbar a[href="#edit"]').tab("show");
            let modelImage = this.model.get("domImage");
            console.log("before", this.stage)
            this.stage.width = modelImage.width;
            this.stage.height = modelImage.height;
            console.log("after", this.stage)

            if(this.imageClip){
                this.imageClip.image = modelImage
            }else{
                this.imageClip = new ImageClip(modelImage);
                this.stage.addChild(this.imageClip);
            }

            this.$el.addClass("show")
            $(".import").addClass("hide");
        });

        this.model.on("change:displayStyle", (model)=>{
            var style = model.get("displayStyle");
            this.stage.visible = true;
            this.$el.removeClass("greyed invisible");
            if(style === "-1"){
                this.stage.visible = false;//this.$el.addClass("invisible");
            }

            if(style === "1"){
                this.$el.addClass("greyed");
            }
        });
    },
    events: {
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    }
});


export default View;
