var fs = require("fs");
module.exports = function ConfigReader(){
    function parse(path){
        var configtext = "";
        // process configfile first!
        configtext = fs.readFileSync(path, 'utf-8');
        // Remove line lead by "#"
        configtext = configtext.replace(/^\s*\#.*$/gim, "");
        // Implement define variable on config by define(VARNAME, VALUE) and call by ::VARNAME
        var matcheddefined = configtext.match(/define\s*\(.*\s*\)\s*\;?/gim);
        if (matcheddefined != null) {
            var proto = {};
            for (var i = 0; i < matcheddefined.length; i++) {
            	// Variable / Function name must be valid
                var config = /define\s*\(\s*([A-Za-z_]\w*)\s*\,\s*(.*)\s*\)\s*\;?/gim.exec(matcheddefined[i]);
                for (var n = 0; n < config.length; n++) {
                    if (typeof(config[n]) == "string") {
                        config[n] = config[n].trim();
                    }
                }
                eval("proto[\""+config[1]+"\"] = "+config[2]);
                // The argument must started by alphabet or underscore, can be followed by \,, \s, \w or not
                if (config[2].match(/function\s*\(\s*([A-Za-z_]*[\w\s\,]*)\s*\)\s*{\s*.*\s*\}/) !== null) {
                	// Take all argument input
                    var regexp = new RegExp('::'+config[1]+'\\s*\\(\\s*(.*)\\s*\\)', "gm");
                    var rawargs = regexp.exec(configtext)
                    if (rawargs) {
                    	rawargs = rawargs[1].split(", ");
                    	var args = [];
                    	for (var n = 0; n < rawargs.length; n++) {
                    		(rawargs[n].trim().length > 0)? eval("args[\""+n+"\"] = "+rawargs[n].trim()):void(0);                        
                    	}
                    	configtext = configtext.replace(regexp, proto[config[1]].apply({}, args));
                    }                    
                } else {
                    var regexp = new RegExp('::'+config[1], "gm");
                    configtext = configtext.replace(regexp, proto[config[1]]);
                }
            }
            // Remove all define 
            configtext = configtext.replace(/define\s*\(\s*.*\s*\)\s*\;?/gim, "");
        }
        configtext = JSON.parse(configtext);
        configtext.__proto__ = proto;
        return configtext;
    }
    this.__proto__.parse = function(path, callback){
    	var result = {};
    	var e = null;
    	try  {
    		result = parse(path);
    	} catch (e) {    		
    	}
    	callback(e, result);
    }
    this.__proto__.parseSync = function(path){
    	return parse(path);
    }
    this.__proto__.init = function(){
    }
    this.init();
};
