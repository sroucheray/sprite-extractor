import spriteSheet from "modules/collections/spritesheet";
import file from "modules/models/file";
import Backbone from "backbone";
import $ from "jquery";

function wrapLines(before, after, text){
    let  splitted = text.split("\n");
    splitted = splitted.map(function(text){
        return before + text + after;
    });

    return splitted.join("");
}

//http://www.2ality.com/2015/01/template-strings-html.html
function html(literalSections, ...substs) {
    // Use raw literal sections: we don’t want
    // backslashes (\n etc.) to be interpreted
    let raw = literalSections.raw;

    let result = '';


    substs.forEach((subst, i) => {
        // Retrieve the literal section preceding
        // the current substitution
        let lit = raw[i];

        // In the example, map() returns an array:
        // If substitution is an array (and not a string),
        // we turn it into a string
        if (Array.isArray(subst)) {
            subst = subst.join('');
        }

        // If the substitution is preceded by a dollar sign,
        // we escape special characters in it
        if (lit.endsWith('$')) {
            subst = htmlEscape(subst);
            lit = lit.slice(0, -1);
        }
        result += lit;
        result += subst;
    });
    // Take care of last literal section
    // (Never fails, because an empty template string
    // produces one literal section, an empty string)
    result += raw[raw.length - 1]; // (A)

    return result;
}





let CSSView = Backbone.View.extend({
    model: spriteSheet,
    el: document.querySelector("#css"),
    initialize: function() {
        this.$code = this.$el.find(".code");
        //spriteSheet.on("add", this.add.bind(this))

        //file.on("change", this.appendHeader);
    },
    events: {},
    parse: function(strings, ...values) {
        let result = "";
        for (var i = 0; i < strings.length; i++) {
            result += strings[i] + values[i];
        };
        return result.replace(/\n/gm, "<br>").replace(/\s/gm, "&nbsp;");
    },
    appendHeader: function(){
            let img = file.get("domImage")
            let src = img.src;
            if(src.length > 100){
                src = src.substr(0, 96) + "...";
            }
            let styles = `<style>
.sprite-output {
background-image: url('${img.src}');
background-repeat: no-repeat;
}
</style>`;

            //this.$code.empty().append(generatedCode);

            let generatedCode = html`.sprite {
    background-image: url('${src}');
    background-repeat: no-repeat;
}`;

            //this.$code.append(wrapLines("<li>", "</li>", generatedCode));
            this.isOdd = true;

            return /*styles +*/ wrapLines("<li>", "</li>", generatedCode);
        },
    add: function(rect) {
        let li = this.isOdd ? "<li class='odd'>" : "<li>";
        let content = `<output class="sprite-output" style="width: ${rect.attributes.width}px;height: ${rect.attributes.height}px;background-position: -${rect.attributes.x}px -${rect.attributes.y}px;"></output>`;

        let generatedCode = html`.sprite.sprite-${rect.id}
    width: ${rect.attributes.width}px;
    height: ${rect.attributes.height}px;
    background-position: -${rect.attributes.x}px -${rect.attributes.y}px;
}`;
        generatedCode = wrapLines("<li>", "</li>", `${generatedCode}${content}`);

        this.isOdd = !this.isOdd;

        //console.log(generatedCode)
        //let $generatedCode = $(generatedCode);
        //$generatedCode.last().append(content);
        //console.log($generatedCode.html(), $generatedCode.find("li"))
        //$generatedCode.appendTo(this.$code).find("li").first().append(content);
        return generatedCode;
    },
    appendCode:function(){
        let content = "";
        spriteSheet.visible().forEach(function(rect){
            console.count('css sprites')
            content += this.add(rect);
        }.bind(this))

        return content;
    }
});
let cssView = new CSSView();
$(".navbar a").on("shown.bs.tab", event=>{
    if($(event.currentTarget).attr("href") === "#css"){
        let code = cssView.appendHeader();
        code += cssView.appendCode();
        cssView.$code.empty().html(code);
        //$generatedCode.appendTo(cssView.$code)
    }
})

export default ()=>{
    return cssView;
};