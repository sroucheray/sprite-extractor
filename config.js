System.config({
  "baseURL": "/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "bootstrap": "github:twbs/bootstrap-sass@3.3.4/assets/javascripts/bootstrap.min",
    "backbone": "npm:backbone@1.2.0",
    "bootflat": "npm:bootflat@2.0.4",
    "jquery": "github:components/jquery@2.1.4",
    "esstage": "github:sroucheray/esstage.js@master/esstage",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "twbs/bootstrap-sass": "github:twbs/bootstrap-sass@3.3.4",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:backbone@1.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.8.3"
    },
    "npm:bootflat@2.0.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

