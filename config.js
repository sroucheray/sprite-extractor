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
    "backbone": "npm:backbone@1.2.1",
    "bootflat": "npm:bootflat@2.0.4",
    "bootstrap": "github:twbs/bootstrap-sass@3.3.4/assets/javascripts/bootstrap",
    "cowboy/jquery-throttle-debounce": "github:cowboy/jquery-throttle-debounce@master",
    "esstage": "github:esstage@1.0.0",
    "event-class": "npm:event-class@0.1.1",
    "jquery": "github:components/jquery@2.1.4",
    "lodash": "npm:lodash@3.9.3",
    "sroucheray/esstage.js": "github:sroucheray/esstage.js@1.0.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "twbs/bootstrap-sass": "github:twbs/bootstrap-sass@3.3.5",
    "github:esstage@1.0.0": {
      "event-class": "npm:event-class@0.1.1"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:backbone@1.2.1": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.8.3"
    },
    "npm:bootflat@2.0.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:lodash@3.9.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

