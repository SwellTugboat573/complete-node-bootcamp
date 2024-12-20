const fs = require('fs'); // the file system module
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTempalte');
////////////////////////////////////////////////////////////////////////////////
// FILE

// // blocking, synchornous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataobj = JSON.parse(data);

const slugs = dataobj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataobj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //Product Page
  } else if (pathname === '/product') {
    const product = dataobj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(output);
    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // Not FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>page not found ! </h1> ');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is running on port 8000');
});
