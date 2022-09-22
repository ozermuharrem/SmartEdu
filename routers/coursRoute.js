const express = require('express');

const coursController = require('../controllers/coursController')
const roleMidllewear = require('../midllewears/roleMidllewear');

const router = express.Router();

router.route('/').post(roleMidllewear(["teacher", "admin"]), coursController.createCourse);
router.route('/').get(coursController.getAllCourse);
router.route('/:slug').get(coursController.getCourse);



module.exports = router;
