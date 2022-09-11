const express = require('express');

const coursController = require('../controllers/coursController')

const router = express.Router();

router.route('/').post(coursController.createCourse);
router.route('/').get(coursController.getAllCourse);
router.route('/:slug').get(coursController.getCourse);



module.exports = router;
