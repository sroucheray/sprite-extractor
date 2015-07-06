/* */ 
import Draw from "esstage/base/Clip";

class DebugClip extends Clip {
    constructor(params, styles){
        super(params, styles);
    }


    get numChildren(){
        return this.children.length;
    }

    hasChild(child){
        return this.children.indexOf(child) > -1;
    }

    beforeRender(child){
        if(!!this.parent){
            this.parent.beforeRender(child);
        }
    }

    afterRender(child){
        if(!!this.parent){
            this.parent.afterRender(child);
        }
    }

    draw(stage){
        super.draw(stage);
        if(!this.numChildren){
            return;
        }

        for(let child of this){
            this.beforeRender(child);
            child.draw(stage);
            this.afterRender(child)
        }
    }
}

export default DebugClip;