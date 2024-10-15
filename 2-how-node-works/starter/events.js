const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super(); // gives us access to the Event Emitter super class
  }
}

const myEmitter = new Sales(); // similar to a dom select
// observers - they wait to be called and then they exectue the callback.
myEmitter.on("newSale", () => {
  console.log("THere was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("customername:jonas");
});
// stock is taking the variable from theemitter.
myEmitter.on("newSale", (stock) => {
  console.log(`three are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9); // emit is although we are clieking on a button. this is the event emitter (what is the trigger for the event

////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request recieved");
  res.end("request received");
});
server.on("request", (req, res) => {
  console.log("another request received!!");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requedsts...");
});
