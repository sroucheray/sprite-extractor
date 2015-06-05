import Backbone from "backbone";
import fileModel from "modules/models/file";

//TODO:filter based on supported file type
const supportedTypes = ["image/gif", "image/png", "image/jpg"];

let View = Backbone.View.extend({
    model: fileModel,
    el: document.querySelector("body"),
    initialize: function() {
    },
    events: {
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    },
    overHandler:function(event){
        event.preventDefault();
        this.$el.addClass("dragover");
    },
    leaveHandler:function(event){
        event.preventDefault();
        this.$el.removeClass("dragover");
    },
    dropHandler:function(event){
        this.leaveHandler(event);

        let data = event.originalEvent.dataTransfer;
        if(data && data.files && data.files.length){
            let file = data.files[0];
            if(!file.type.match(/image.*/)){
                console.warn("The dropped file is not an image: ", file.type);
                return;
            }
            this.loadFile(file);
        }
    },
    loadFile:function(file){
        var reader = new FileReader();
        reader.onload = (e) => {
            var img = new Image();
            img.onload = () => {
                this.model.set("image", img);
            }
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});


export default View;
