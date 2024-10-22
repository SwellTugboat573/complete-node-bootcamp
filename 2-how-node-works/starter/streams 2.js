const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  // solution2: streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found");
  // });
  //solution 3 - beacause the you can stream data faster then the socket can transmit it which can break the socket.

  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pip(writeableDestination) we have taken the data from the test file and now are slowly pushing it into the response.
  // minimises the slow pipe
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Now listening");
});
