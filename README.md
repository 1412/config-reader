Usage
=====
```
<<<<<<< HEAD
## Sync
=======
>>>>>>> 1f8d570dc6c08de24d850bfe3b55d44e382b5bf1
var confreader = require("config-reader");
try {
   var config = (new confreader()).parseSync("config.json");
} catch (e) {
}
<<<<<<< HEAD
console.log(config);

## Async
var confreader = require("config-reader");
(new confreader()).parse("config.json", function(error, config){
   if (error) {
   } else {
      console.log(config);
   }
});

```

=======
```

>>>>>>> 1f8d570dc6c08de24d850bfe3b55d44e382b5bf1
Config Format
============
```
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
```

To Do
=====
1. Suport more complex config
2. Allow multiline comment
3. Allow nested definition, and function call
<<<<<<< HEAD
4. Ignore trailing comma
5. ignore quote in key definiton
=======
>>>>>>> 1f8d570dc6c08de24d850bfe3b55d44e382b5bf1
