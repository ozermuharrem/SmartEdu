const express = require('express');

const UserController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(UserController.createUser);
router.route('/login').post(UserController.loginUser);





module.exports = router;
