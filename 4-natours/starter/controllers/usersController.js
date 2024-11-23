const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // returns an array of objects
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if password data is posted
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please user /updateMyPassword',
        400,
      ),
    );
  }
  // 2) if not update the document
  // putting body in the finbyIdUpdate as a second argument will mean role can be changed
  //filtered out unwanted fields to ensure only cahngable fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  //not save because the required fields would not be able to be overridded.
  res.status(200).json({
    status: 'Success',
    date: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'succes',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message:
      'This route is not yet defined and never will be. Please use Sign up',
  });
};
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// do NOT update passwords with this!

exports.updateUsers = factory.updateOne(User);
exports.deleteUsers = factory.deleteOne(User);

//Original endpoint function befor making a factory Handler function
// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();

//   //Send Response
//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     requestedAt: req.requestTime,
//     data: {
//       users,
//     },
//   });
// });
