const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("TImer 1 finished"), 0);
setImmediate(() => console.log("immefiate 1 finished"));

fs.readFile("test-File.txt", () => {
  console.log("i//o finished");

  setTimeout(() => console.log("TImer 2 finished"), 0);
  setTimeout(() => console.log("TImer 3 finished"), 3000);
  setImmediate(() => console.log("immefiate 2 finished"));

  process.nextTick(() => console.log("process.nextTIck"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
});

console.log("hello from the toplevel code");
