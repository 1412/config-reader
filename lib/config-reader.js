var fs = require("fs");
module.exports = function ConfigReader(){
    this.__proto__.ReadFile = function(path){
        var configtext = "";
        // process configfile first!
        configtext = fs.readFileSync(path, 'utf-8');
        // Remove line lead by "#"
        configtext = configtext.replace(/^\s*\#.*$/gim, "");
        // Implement define variable on config by define(VARNAME, VALUE) and call by ::VARNAME
        var matcheddefined = configtext.match(/define\s*\(.*\s*\)\s*\;/gim);
        if (matcheddefined != null) {
            var proto = {};
            for (var i = 0; i < matcheddefined.length; i++) {
                var config = /define\s*\(\s*(.*)\s*\,\s*(.*)\s*\)\s*\;/.exec(matcheddefined[i]);
                for (var n = 0; n < config.length; n++) {
                    if (typeof(config[n]) == "string") {
                        config[n] = config[n].trim();
                    }
                }
                eval("proto[\""+config[1]+"\"] = "+config[2]);
                if (config[2].match(/function\s*\(\s*.*\s*\)\s*{\s*.*\s*\}/) !== null) {
                    var regexp = new RegExp('::'+config[1]+'\\s*\\(\\s*(.*)\\s*\\)', "gm");
                    var rawargs = regexp.exec(configtext)[1].split(", ");
                    var args = [];
                    for (var n = 0; n < rawargs.length; n++) {
                    	(rawargs[n].trim().length > 0)? eval("args[\""+n+"\"] = "+rawargs[n].trim()):void(0);                        
                    }
                    configtext = configtext.replace(regexp, proto[config[1]].apply({}, args));
                } else {
                    var regexp = new RegExp('::'+config[1], "gm");
                    configtext = configtext.replace(regexp, proto[config[1]]);
                }
            }
            configtext = configtext.replace(/define\s*\(\s*.*\s*\)\s*\;/gim,"");
        }
        configtext = JSON.parse(configtext);
        configtext.__proto__ = proto;
        return configtext;
    }
    this.__proto__.init = function(){
    }
    this.init();
};
