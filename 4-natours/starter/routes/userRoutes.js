const express = require('express');
const router = express.Router();
const userControler = require('./../controllers/usersController');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotpassword);
router.patch('/resetPassword/:token', authController.resetPassword);
// Protect all routes after
router.use(authController.protect);
// Must be logged in to use below
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userControler.getMe, userControler.getUser);
router.patch('/updateMe', userControler.updateMe);
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
