const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // ensures that fields like max length(validators) are re checked when updating the field.
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); // assumes there is an error
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    const data = await model.create(req.body);
    console.log(newtour);
    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    });
  });
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id, req.body);

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: null,
//   });
// });
