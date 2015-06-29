import SpriteModel from "modules/models/sprite";
import Backbone from "backbone";
import fileModel from "modules/models/file";
import _ from "lodash";

var SpriteSheet = Backbone.Collection.extend({
    model: SpriteModel,
    initialize:function(){
        this.numVisible = 0;
        this.on("add remove", (rect)=>{
            fileModel.set("maxID", Math.max(fileModel.get("maxID"), rect.id));
            fileModel.set("maxSize", Math.max(fileModel.get("maxSize"), rect.size));
            fileModel.set("maxWidth", Math.max(fileModel.get("maxWidth"), rect.attributes.width));
            fileModel.set("maxHeight", Math.max(fileModel.get("maxHeight"), rect.attributes.height));

            fileModel.set("minSize", Math.min(fileModel.get("minSize"), rect.size));
            fileModel.set("minWidth", Math.min(fileModel.get("minWidth"), rect.attributes.width));
            fileModel.set("minHeight", Math.min(fileModel.get("minHeight"), rect.attributes.height));
        });

        this.on("change:visible add remove", _.throttle(()=>{
            console.log(this.numVisible)
            this.numVisible = this.filter(function(rect){
                return rect.get("visible");
            }).length;

            this.trigger("update_visibility");
        }, 500));

    },
    selected: function(){
        return this.filter(function(rect){
            return rect.get("selected") && rect.get("visible");
        });
    },
    visible: function(){
        return this.filter(function(rect){
            return rect.get("visible");
        });
    },
    rowsVisible:function(){
        this.visible().pluck("line");
    },
    mergeRects:function(rects){
        let minX = _.min(rects, function(rect){
            return rect.get("x");
        }).get("x");

        let maxX = _.max(rects, function(rect){
            return rect.get("x") + rect.get("width");
        });

        maxX = maxX.get("x") + maxX.get("width");


        let minY = _.min(rects, function(rect){
            return rect.get("y");
        }).get("y");

        let maxY = _.max(rects, function(rect){
            return rect.get("y") +  rect.get("height");
        });

        maxY = maxY.get("y") + maxY.get("height");

        let mergedRect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            selection: rects,
            id: (++this.maxID),
            selected: true
        };

        this.add(mergedRect);
        this.remove(rects);
    },
    merge:function(){
        let numSelected = this.selected().length;
        if(numSelected === 0){
            return;
        }

        if(numSelected === 1){
            this.selectOverlapping();

            return;
        }

        if(numSelected > 1){
            this.mergeSelection();

            return;
        }
    },
    selectOverlapping:function(){
        let selectedRect = this.selected()[0];
        let left = selectedRect.get("x"),
            top = selectedRect.get("y"),
            right = left + selectedRect.get("width"),
            bottom = top + selectedRect.get("height");

        this.forEach(function(rect){
            let rectLeft = rect.get("x"),
                rectTop = rect.get("y"),
                rectRight = rectLeft + rect.get("width"),
                rectBottom = rectTop + rect.get("height");


            if(!(rectLeft > right || rectRight < left ||  rectTop > bottom || rectBottom < top)){
                rect.set("selected", true);
            }
        });
    },
    mergeSelection:function(){
        let selectedRects = this.selected();
        this.mergeRects(selectedRects);
    },
    removeSelection:function(){
        let selectedRects = this.selected();
        this.remove(selectedRects);
    },
    filterOnSize:function(wider, narrower, taller, smaller, morethanpixels, lessthanpixels){
        this.forEach(function(rect){
            let visible = rect.size >= morethanpixels && rect.size <= lessthanpixels && rect.attributes.width >= wider && rect.attributes.width <= narrower && rect.attributes.height >= taller && rect.attributes.height <= smaller;
            rect.set("visible", visible);
        }.bind(this))

        this.trigger("change:visible");
    }
});

export default new SpriteSheet();