importScripts("/jspm_packages/github/jmcriffey/bower-traceur@0.0.88/traceur.min.js");
importScripts("/jspm_packages/es6-module-loader.js");
importScripts("/jspm_packages/system.js");
importScripts("/config.js");

onmessage = function(e) {
    var imageData = e.data.imageData;
    console.log(e.data)
    System.import("modules/workers/SpriteAnalyser").then(function(imports){
        var SpriteAnalyser = imports.default;
        var spriteAnalyser = new SpriteAnalyser(imageData);

        spriteAnalyser.on("sprite", function(rect){
            postMessage({
                type: "rect",
                data: rect
            });
        });

        spriteAnalyser.on("row", function(row){
            postMessage({
                type: "row",
                data: row
            });
        });
        /*spriteAnalyser.on("bg", function(data){
            //console.log(data);
            data.isBG = true;
            postMessage(data);
        });*/

        spriteAnalyser.analyse2();
    });
};