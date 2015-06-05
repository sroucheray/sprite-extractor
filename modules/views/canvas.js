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
        this.model.on("change:image", ()=>{
            let modelImage = this.model.get("image");
            this.el.width = modelImage.width;
            this.el.height = modelImage.height;

            let image = new ImageClip(modelImage);
            this.stage.addChild(image);

            this.$el.addClass("show")
            $(".import").addClass("hide");
        });
    },
    events: {
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    },
    getImageData(){
        return this.stage.ctx.getImageData(0, 0, this.stage.width, this.stage.height);
    }
});


export default View;
