//import PubSub from "esstage/utils/PubSub";
import EventClass from "event-class";

class Draw extends EventClass {
    constructor(params = {
        x: 0,
        y: 0,
        width: 300,
        height: 150,
        visible: true
    }, styles = {
        strokeStyle: "black",
        fillStyle: "black",
        shadowOffsetX: 0.0,
        shadowOffsetY: 0.0,
        shadowBlur: 0.0,
        shadowColor: "transparent black"
    }) {
        super();

        for(let param in params){
            this[param] = params[param]
        }

        for(let style in styles){
            this[style] = styles[style]
        }

        this.resetTransforms();

        this.center(0, 0);
        this.parent = null;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
        this.trigger("update:visible", value);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        this.trigger("update:x", value);
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        this.trigger("update:y", value);
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        this.trigger("update:width", value);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
        this.trigger("update:height", value);
    }

    get strokeStyle() {
        return this._strokeStyle;
    }

    set strokeStyle(value) {
        this._strokeStyle = value;
        this.trigger("update:strokeStyle", value);
    }

    get fillStyle() {
        return this._fillStyle;
    }

    set fillStyle(value) {
        this._fillStyle = value;
        this.trigger("update:fillStyle", value);
    }

    get shadowOffsetX() {
        return this._shadowOffsetX;
    }

    set shadowOffsetX(value) {
        this._shadowOffsetX = value;
        this.trigger("update:shadowOffsetX", value);
    }

    get shadowOffsetY() {
        return this._shadowOffsetY;
    }

    set shadowOffsetY(value) {
        this._shadowOffsetY = value;
        this.trigger("update:shadowOffsetY", value);
    }

    get shadowBlur() {
        return this._shadowBlur;
    }

    set shadowBlur(value) {
        this._shadowBlur = value;
        this.trigger("update:shadowBlur", value);
    }

    get shadowColor() {
        return this._shadowColor;
    }

    set shadowColor(value) {
        this._shadowColor = value;
        this.trigger("update:shadowColor", value);
    }

    get parent() {
        return this._parent;
    }

    set parent(value) {
        this._parent = value;
    }

    hasParent(){
        return !!this._parent && this.parent.hasChild(this);
    }

    center(x, y){
        this.centerX = x;
        this.centerY = y;
    }

    get stageX(){
        return this.x + this.parent.stageX;
    }

    get stageY(){
        return this.y + this.parent.stageY;
    }

    resetTransforms(){
        this.transforms = [];
    }

    transform(prop, val) {
        if(!arguments.length){
            return this;
        }

        if(arguments.length === 1){
            for(let aprop in prop){
                this.transform(aprop, prop[prop]);
            }

            return this;
        }

        this.transforms.push({prop: prop, value: val});

        this.trigger("update", {
            property: prop,
            value: val
        });

        return this;
    }

    rotateAround(rx, ry, angle){
        const centerX = this.stageX + this.centerX;
        const centerY = this.stageY + this.centerY;
        rx += this.stageX;
        ry += this.stageY;
        const radius = Math.sqrt(Math.pow(rx - centerX, 2) + Math.pow(ry - centerY, 2));
        const dx = rx + radius * Math.sin(angle);
        const dy = ry - radius * Math.cos(angle);

        this.transform("translate", [dx, dy]);
        this.transform("rotate", angle);
        this.transform("translate", [-dx, -dy]);

        return this;
    }

    rotateAroundCenter(angle){
        return this.rotateAround(this.centerX, this.centerY, angle);
    }

    scale(x = 1, y = 1){
        const centerX = this.stageX + this.centerX;
        const centerY = this.stageY + this.centerY;
        this.transform("translate", [centerX, centerY]);
        this.transform("scale", [x, y]);
        this.transform("translate", [-centerX, -centerY]);

        return this;
    }

    skew(x = 0, y = 0){
        const centerX = this.stageX + this.centerX;
        const centerY = this.stageY + this.centerY;
        this.transform("translate", [centerX, centerY]);
        this.transform("skew", [x, y]);
        this.transform("translate", [-centerX, -centerY]);
    }

    applyTransforms(stage){
        for (let {prop, value} of this.transforms) {
            value = Array.isArray(value) ? value : [value];
            if(prop === "rotate"){
                stage.ctx.rotate.apply(stage.ctx, value);
            } else if(prop === "translate"){
                stage.ctx.translate.apply(stage.ctx, value);
            } else if(prop === "scale"){
                stage.ctx.scale.apply(stage.ctx, value);
            } else if(prop === "skew"){
                stage.ctx.transform.apply(stage.ctx, [1, ...value, 1, 0, 0]);
            }
        }
    }

    draw(stage) {
        stage.ctx.strokeStyle = this.strokeStyle;
        stage.ctx.fillStyle = this.fillStyle;
        stage.ctx.shadowOffsetX = this.shadowOffsetX;
        stage.ctx.shadowOffsetY = this.shadowOffsetY;
        stage.ctx.shadowBlur = this.shadowBlur;
        stage.ctx.shadowColor = this.shadowColor;

        this.applyTransforms(stage);

        return this;
    }
}

export default Draw;