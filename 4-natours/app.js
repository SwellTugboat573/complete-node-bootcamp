const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // middleware which sits between the request and the response to manipulate the data

app.use(express.static(`${__dirname}/public`)); // allows for any static folders to be access via the url folder3

app.use((req, res, next) => {
  console.log('hello from the middleware ☺️');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
