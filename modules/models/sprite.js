import Backbone from "backbone";

var SpriteModel = Backbone.Model.extend({
    initialize: function (attrs) {
        this.size = attrs.width * attrs.height;
    }
});


export default SpriteModel;