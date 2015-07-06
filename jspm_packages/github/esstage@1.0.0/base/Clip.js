/* */ 
import Draw from "esstage/base/Draw";

class Clip extends Draw {
    constructor(params, styles){
        super(params, styles);
        this.children = [];
    }

    * [Symbol.iterator]() {
        for (let child of this.children) {
            yield child;
        }
    }

    debug(debug){
        this._debug = debug;
    }

    bubbleEvent(event, originalChild){
        return (data) =>{
            if(!!this.parent){
                data = data || {};
                data.child = originalChild;
                this.trigger(event, data);
            }
        }
    }

    addChild(child){
        this.children.push(child);
        child.parent = this;
        this.trigger("child_added", child);
        child.trigger("update", child);
        child.on("update", this.bubbleEvent("update", child));
    }

    get numChildren(){
        return this.children.length;
    }

    hasChild(child){
        return this.children.indexOf(child) > -1;
    }

    beforeRender(child, stage){
        if(!!this.parent){
            this.parent.beforeRender(child);
        }
    }

    afterRender(child, stage){
        if(!!this.parent){
            this.parent.afterRender(child);
        }

        if(this._debug){
            let oldStrokeStyle = stage.ctx.strokeStyle;
            stage.ctx.strokeStyle = "red"
            stage.ctx.strokeRect(this.stageX, this.stageY, this.width, this.height);
            stage.ctx.arc(this.stageX + this.centerX, this.stageY + this.centerY, 3, 0, Math.PI * 2, false);
            stage.ctx.strokeStyle = oldStrokeStyle;
        }
    }

    draw(stage){
        super.draw(stage);
        if(!this.numChildren){
            return;
        }

        for(let child of this){
            if(child.visible){
                this.beforeRender(child, stage);
                child.draw(stage);
                this.afterRender(child, stage)
            }
        }
    }
}

export default Clip;