import SpriteModel from "modules/models/sprite";
import Backbone from "backbone";
import _ from "lodash";

var SpriteSheet = Backbone.Collection.extend({
    model: SpriteModel,
    initialize:function(){
        this.numSelected = 0;
        this.maxID = 0;
        this.maxSize = 0;
        this.on("change:selected", (rect)=>{
            if(rect.get("selected")){
                this.numSelected++;

                return;
            }

            this.numSelected--;
        });

        this.on("remove", (rect)=>{
            if(rect.get("selected")){
                this.numSelected--;

                return;
            }
        });

        this.on("add", (rect)=>{
            this.maxID = Math.max(this.maxID, rect.id);
            this.maxSize = Math.max(this.maxSize, rect.size);
        });
    },
    visible:function(){
        return this.filter(function(rect){
            return !(rect.has("show") && !rect.get("show"));
        });
    },
    numVisible:function(){
        return this.visible().length;
    },
    rowsVisible:function(){
        this.visible().pluck("line");
    },
    merge:function(){
        console.log('merge ')
        if(this.numSelected === 0){
            return;
        }

        if(this.numSelected === 1){
            this.mergeOverlapping();

            return;
        }

        if(this.numSelected > 1){
            console.log('merge selection')
            this.mergeSelection();

            return;
        }
    },
    mergeOverlapping:function(){

    },
    mergeSelection:function(){
        let selectedModels = this.filter(function(rect){
            return rect.get("selected");
        });

        let minX = _.min(selectedModels, function(rect){
            return rect.get("x");
        }).get("x");

        let maxX = _.max(selectedModels, function(rect){
            return rect.get("x") + rect.get("width");
        });

        maxX = maxX.get("x") + maxX.get("width");


        let minY = _.min(selectedModels, function(rect){
            return rect.get("y");
        }).get("y");

        let maxY = _.max(selectedModels, function(rect){
            return rect.get("y") +  rect.get("height");
        });

        maxY = maxY.get("y") + maxY.get("height");

        let mergedRect = {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            selection: selectedModels,
            id: (++this.maxID),
            selected: true
        };

        this.add(mergedRect);
        this.remove(selectedModels);
    }
});

export default new SpriteSheet();