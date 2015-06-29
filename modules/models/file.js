import Backbone from "backbone";

const defaults = {
    maxID: 0,
    maxSize: 0,
    maxWidth: 0,
    maxHeight: 0,
    minSize: Number.POSITIVE_INFINITY,
    minWidth: Number.POSITIVE_INFINITY,
    minHeight: Number.POSITIVE_INFINITY
};

var FileModel = Backbone.Model.extend({
    defaults: defaults,
    initialize: function () {
        this.on("change:date", ()=>{
            this.set(defaults);
        });
    }
});


export default new FileModel();