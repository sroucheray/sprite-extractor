import Backbone from "backbone";

var SpriteModel = Backbone.Model.extend({
    defaults: {
        visible:true,
        selected: false,
    },
    initialize: function (attrs) {
        this.size = attrs.width * attrs.height;
    }
});


export default SpriteModel;