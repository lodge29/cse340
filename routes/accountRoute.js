const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const validate = require('../utilities/account-validation');
const utilities = require("../utilities/")



router.get('/login', accountController.buildLogin)
router.get('/register', accountController.buildRegister)
router.get('/management', utilities.checkLogin, accountController.buildManagement)

router.post('/register', validate.registationRules(), validate.checkRegData, accountController.registerAccount)
router.post('/login', validate.loginRules(), validate.checkLoginData, accountController.accountLogin)

module.exports = router;