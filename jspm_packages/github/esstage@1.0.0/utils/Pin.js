/* */ 
export const CENTER = Symbol("center");
export const TOP_LEFT = Symbol("top_left");
export const TOP_RIGHT = Symbol("top_right");
export const TOP_CENTER = Symbol("top_center");
export const BOTTOM_LEFT = Symbol("bottom_left");
export const BOTTOM_RIGHT = Symbol("bottom_right");
export const BOTTOM_CENTER = Symbol("bottom_center");
export const LEFT_CENTER = Symbol("left_center");
export const RIGHT_CENTER = Symbol("right_center");

class Pin {
    constructor(parent, child){
        this.parent = parent;
        this.child = child;
        this.pin = TOP_LEFT;
    }

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    get child() {
        return this._child;
    }

    set child(value) {
        this._child = value;
    }

    get pin() {
        return this._pin;
    }

    set pin(value) {
        this._pin = value;
    }

    pinCenter(){

    }

    pinTopLeft(){

    }

    pinTopRight(){

    }

    pinTopCenter(){

    }

    pinBottomLeft(){

    }

    pinBottomRight(){

    }

    pinBottomCenter(){

    }

    pinLeftCenter(){

    }

    pinRightCenter(){

    }

    update(){
        switch(this.pin){
            case CENTER:
                break;
            case TOP_RIGHT:
                break;
            case TOP_CENTER:
                break;
            case BOTTOM_LEFT:
                break;
            case BOTTOM_RIGHT:
                break;
            case BOTTOM_CENTER:
                break;
            case LEFT_CENTER:
                break;
            case RIGHT_CENTER:
                break;
            case TOP_LEFT:
            default:

                break;
        }
    }
}

export default Pin;