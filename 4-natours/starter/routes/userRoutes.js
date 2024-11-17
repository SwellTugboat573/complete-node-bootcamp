const express = require('express');
const router = express.Router();
const userControler = require('./../controllers/usersController');
const authControler = require('./../controllers/authController');

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);
router.post('/forgotPassword', authControler.forgotpassword);
router.patch('/resetPassword/:token', authControler.resetPassword);
router.patch(
  '/updateMyPassword',
  authControler.protect,
  authControler.updatePassword,
);
router.patch('/updateMe', authControler.protect, userControler.updateMe);
router.delete('/deleteMe', authControler.protect, userControler.deleteMe);

// The route
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUsers)
  .delete(userControler.deleteUsers);

module.exports = router;
