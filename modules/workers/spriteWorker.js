"use strict";
importScripts("/sprite-extractor/jspm_packages/github/jmcriffey/bower-traceur@0.0.88/traceur.min.js");
importScripts("/sprite-extractor/jspm_packages/es6-module-loader.js");
importScripts("/sprite-extractor/jspm_packages/system.js");
importScripts("/sprite-extractor/config.js");

var importPromise = System.import("modules/workers/SpriteAnalyser");
var spriteAnalyser;
onmessage = function(e) {
    var imageData = e.data.imageData;
        console.log("get image", imageData);

    importPromise.then(function(imports){
        var SpriteAnalyser = imports.default;
        spriteAnalyser = new SpriteAnalyser(imageData);
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

        spriteAnalyser.on("end", function(){
            postMessage({
                type: "end"
            });
        });

        spriteAnalyser.analyse2();
    });
};