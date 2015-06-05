import Row from "modules/models/row";
import Backbone from "backbone";

var Rows = Backbone.Collection.extend({
  model: Row
});

export default new Rows();