const express = require('express');

const AuthController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(AuthController.createUser);
router.route('/login').post(AuthController.loginUser);





module.exports = router;
