const Review = require('../models/reviewModels');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
// Data shared on disk vs memory - slowly uploads
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user -{userId}-{timestamp}.jpeg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });
// faster manipulatiokn and access to the file
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images,', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // returns an array of objects
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
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
  if (req.file) filteredBody.photo = req.file.filename;
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
