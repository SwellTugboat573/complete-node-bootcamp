const Tour = require('../models/tourModels');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tou data from collection
  const tours = await Tour.find();

  // 2) build template

  // 3) render that template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // 1) get the data, for the requested tou (including reviews and user)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  // 3) Render Template using data from 1
  console.log(tour.reviews[0].user.photo);
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});
