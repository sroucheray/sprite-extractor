import SpriteModel from "modules/models/sprite";
import Backbone from "backbone";
import _ from "lodash";

var SpriteSheet = Backbone.Collection.extend({
    model: SpriteModel,
    initialize:function(){
        this.maxID = 0;
        this.maxSize = 0;

        this.on("add", (rect)=>{
            this.maxID = Math.max(this.maxID, rect.id);
            this.maxSize = Math.max(this.maxSize, rect.size);
        });
    },
    selected: function(){
        return this.filter(function(rect){
            return rect.get("selected");
        });
    },
    numVisible:function(){
        return this.visible().length;
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
    }
});

export default new SpriteSheet();