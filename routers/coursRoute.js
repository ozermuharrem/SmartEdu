const express = require('express');

const coursController = require('../controllers/coursController')

const router = express.Router();

router.route('/').post(coursController.createCourse);

module.exports = router;
