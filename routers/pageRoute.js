const express = require('express');

const pageController = require('../controllers/pageController')
const redirctMidllewear = require('../midllewears/redirctMidllewear')


const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirctMidllewear,pageController.getRegisterPage);
router.route('/login').get(redirctMidllewear,pageController.getLoginPage);


module.exports = router;


