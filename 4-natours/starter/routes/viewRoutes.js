const express = require('express');
const viewsController = require('../controllers/viewController');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(authController.isLoggedIn);

router.get('/', viewsController.getOverview);

// router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
