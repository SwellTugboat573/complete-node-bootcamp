const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `duplicate field value: ${value[0]} please try another`;
  return new AppError(message, 400);
};

const handlEvalidationErrorDB = (err) => {
  // this was used because errors held an object of objects which needed to be iterated over.
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input Data.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid Token. Please log in again', 401);
const handleJWTExpiredError = (err) =>
  new AppError('Your Token has expired. Please log in again', 401);

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //Rendered website
  // 1) log the error
  console.error('Error💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // a) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programing or other unknown error:don't leak error details to the client.
    // 1) log the error
    console.error('Error💥', err);
    console.error('error body 🤷🏼‍♂️', err.response.body.errors);
    //send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }

  //B) RRENDER WEBSITE
  if (err.isOperational) {
    console.log(err);
    // A) Operational, trusted error: send message to client
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programing or other unknown error:don't leak error details to the client.
  // 1) log the error
  console.error('Error💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log('the let error 👉🏼', err);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handlEvalidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
