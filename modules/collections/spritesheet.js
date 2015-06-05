import SpriteModel from "modules/models/sprite";
import Backbone from "backbone";

var SpriteSheet = Backbone.Collection.extend({
  model: SpriteModel
});

export default new SpriteSheet();