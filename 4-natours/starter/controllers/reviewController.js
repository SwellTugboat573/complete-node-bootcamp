const Review = require('../models/reviewModels');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  console.log(filter);
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    requestedAt: req.requestedAt,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // allows nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  console.log(req.params.tourId, req.user.id, 'the id params');
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: {
      review: newReview,
    },
  });
});
