const express = require('express');

const userControler = require('./../controllers/usersController');
const authController = require('./../controllers/authController');
// adding the option of the dest means it's saved

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotpassword);
router.patch('/resetPassword/:token', authController.resetPassword);
// Protect all routes after
router.use(authController.protect);
// Must be logged in to use below
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userControler.getMe, userControler.getUser);
router.patch(
  '/updateMe',
  userControler.uploadUserPhoto,
  userControler.resizeUserPhoto,
  userControler.updateMe,
);
router.delete('/deleteMe', userControler.deleteMe);

router.use(authController.restrictTo('admin'));
// The route
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUsers)
  .delete(userControler.deleteUsers);

module.exports = router;
