const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); // middleware which sits between the request and the response to manipulate the data

// app.get('/', (req, res) => {
//   res
//     .status(404)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// }); // this means if a server is sent to this exact server then it beomes status 404

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send(`Done`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`App Running on port ${port}....`);
});
