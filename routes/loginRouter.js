const express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController')

router.get('/', loginController.loginPage);

module.exports = router;
