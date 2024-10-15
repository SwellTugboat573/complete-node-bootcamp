// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-mnodule-1");
const calc1 = new C();

console.log(calc1.add(5, 6));

//exports
//const calc2 = require("./test-module-2");
const { add, mulitple, divide } = require("./test-module-2"); // must be exact name as in file
console.log(add(5, 9));

// Caching
require("./test-module-3")(); // this will immediately call the function from the file.
require("./test-module-3")(); // this will immediately call the function from the file.
require("./test-module-3")(); // this will immediately call the function from the file.
// when starting this loading the log this beautiful text 3 times but only the "Hello from the module" once. becuase the beautiful text was cached because once called a second time it will only pull the data from the function and not reload the function.
