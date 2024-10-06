const fs = require("fs"); // the file system module
const http = require("http");
const url = require("url");
////////////////////////////////////////////////////////////////////////////////
// FILE

// // blocking, synchornous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written!");

//non- blocking, asynchronous way
// fs.readFile("./txt/star5555t.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(err);

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written ☺️");
//       });
//     });
//   });
// });

// console.log("will read file");

////////////////////////////////////////////////////////////////////////////////
// Server
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("this is the OVERVIEW");
  } else if (pathName === "/product") {
