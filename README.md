Usage

var confreader = require("config-reader");
try {
   var config = (new confreader()).ParseFile("config.json");
} catch (e) {
}

Where config.json

# Hey, this config reader allow comment
define(HOME_PATH, function( ){ return process.env.HOME });
define(PROGRAM_PATH, function( ){ return require('path').dirname(require.main.filename) });
define(CUSTOM_PATH, "/home/username/");
define(NUMBER, 5);
define(MULTIPLY, function( a, b ) { return a * b });

{
  "config": "value",
  "useobject": {
     "child1": 0,
     "child2": 1,
  },
  "use_array": [0, 1, 2, {}],
  "use_variable": "::CUSTOM_PATH/docs/",
  "use_number": ::NUMBER,
  "use_function": "::HOME_PATH()"
  "use_function2": ::MULTIPLY(2, 3)
}
