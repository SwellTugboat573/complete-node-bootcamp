const express = require('express');
const router = express.Router();
const userControler = require('./../controllers/usersController');
const authControler = require('./../controllers/authController');

router.post('/signup', authControler.signup);
router.post('/login', authControler.login);

// The route
router.route('/').get(userControler.getAllUsers).post(userControler.createUser);

router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUsers)
  .delete(userControler.deleteUsers);

module.exports = router;
