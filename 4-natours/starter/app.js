const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Global Middleware
//Security HTTPS
app.use(helmet());

//dev logging/
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: ' Too many requests from  this IP, please try again in an hour!',
});

app.use('/api', limiter); // affects all the
//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // middleware which sits between the request and the response to manipulate the data
// data sanitization against xss
app.use(xss());

// prevent parameter pollution
// whitelist is an array of data you want to allow multiple lists.
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingAverage',
      'ratingQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Data sanitization against NoSQL query Injection
app.use(mongoSanitize());
// Serving static Files
app.use(express.static(`${__dirname}/public`)); // allows for any static folders to be access via the url folder

// app.use((req, res, next) => {
//   console.log('hello from the middleware ☺️');
//   next();
// });
// test
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
