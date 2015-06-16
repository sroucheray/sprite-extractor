import $ from "jquery";
import Backbone from "backbone";
import fileModel from "modules/models/file";
import ImageLoader from "esstage/utils/ImageLoader";
const supportedTypes = ["image/gif", "image/png", "image/jpg"];

let View = Backbone.View.extend({
    model: fileModel,
    el: document.querySelector(".dropzone"),
    events:{
        "change input[type=file]": "loadFileFromInput",
        "click a": "loadFileFromUrl",
        "click": "openFileSelector",
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    },
    loadFileFromInput: function(event){
        event.preventDefault();
        if(event.target.files && event.target.files.length){
            let file = event.target.files[0];
            this.loadFile(file);
        }
    },
    loadFileFromUrl: function(event){
        event.preventDefault();
        this.loadFile(this.$el.find("a img").attr("src"));
    },
    openFileSelector: function(event){
        let $file = this.$el.find('input[type="file"]'),
            $image = this.$el.find('img');
        if(event.target !== $file.get(0) && event.target !== $image.get(0)){
            event.preventDefault();
            this.$el.find('input[type="file"]').click();
        }
    },
    overHandler:function(event){
        event.preventDefault();
        this.$el.find(".dropzone").addClass("dragover");
    },
    leaveHandler:function(event){
        event.preventDefault();
        this.$el.find(".dropzone").removeClass("dragover");
    },
    dropHandler:function(event){
        this.leaveHandler(event);

        let data = event.originalEvent.dataTransfer;
        if(data && data.files && data.files.length){
            let file = data.files[0];
            this.loadFile(file);
        }
    },
    loadFile:function(file){
        if((file instanceof File) && !file.type.match(/image.*/)){
            console.warn("The dropped file is not an image: ", file.type);
            return;
        }

        let loader = new ImageLoader();
        loader.load(file).then((data)=>{
            console.log("loaded", data.images)
            this.model.set({
                "domImage": data.images[0],
                "url": file,
                "date": new Date().getTime()
            });
        });
    }
});


export default View;
