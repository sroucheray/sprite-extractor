import $ from "jquery";
import Backbone from "backbone";
import spriteSheet from "modules/collections/spritesheet";

let View = Backbone.View.extend({
    model: spriteSheet,
    el: document.querySelector(".output"),
    initialize: function() {
        this.$bgImage = this.$el.find(".background-images");
        this.$pre = this.$el.find("pre");
        this.model.on("add", (rect)=>{
            this.render(rect)
        });
    },
    events: {
        "dragover": "overHandler",
        "dragleave": "leaveHandler",
        "drop": "dropHandler"
    },
    render:function(rect){
        let css =
`  background-position: -${rect.attributes.x}px -${rect.attributes.y}px;
  width: ${rect.attributes.width}px;
  height: ${rect.attributes.height}px;`;
        let code =
`<div>.sprite-${rect.id} {
${css}
}</div>`;

        let $code = $(code).appendTo(this.$pre)

        let styles = `background-image:url(${this.src});`;
        let bgImage = `<div class="image">
            <a href="#" class="thumbnail">
                <div style="${styles} ${css}"></div>
            </a>
        </div>`;

        let $bgImage = $(bgImage).appendTo(this.$bgImage);
        let codeHeight = $code.height();
        let bgImageHeight = $bgImage.height();
        if(bgImageHeight > codeHeight){
            $code.height(bgImageHeight);
        }else{
            $bgImage.height(codeHeight);
        }

        /*let $div = $("<div>").attr({
            class:"rect",
            id: `rect-${rect.id}`
        }).css({
            left: `${rect.attributes.x}px`,
            top: `${rect.attributes.y}px`,
            width: `${rect.attributes.width}px`,
            height: `${rect.attributes.height}px`
        });

        this.$el.append($div);*/
    }
});


export default View;
