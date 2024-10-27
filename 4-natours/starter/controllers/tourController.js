const Tour = require('../models/tourModels');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );
// Shows how middle ware works.
// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid ID',
//     });
//   }
//   next();
// };
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price in request',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    console.log(req.params.id);
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      //results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newtour = await Tour.create(req.body);
    console.log(newtour);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newtour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed to create',
      Message: err, //'Invalid data sent!',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
