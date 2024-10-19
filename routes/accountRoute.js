const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const validate = require('../utilities/account-validation');
const utilities = require("../utilities/")



router.get('/login', 
    utilities.handleErrors(accountController.buildLogin))
router.get('/register', 
    utilities.handleErrors(accountController.buildRegister))

router.get('/management', 
    utilities.checkLogin, // check login data
    utilities.handleErrors(accountController.buildManagement))

router.post('/register', 
    validate.registationRules(), 
    validate.checkRegData, // validate
    utilities.handleErrors(accountController.registerAccount))
router.post('/login', 
    validate.loginRules(), 
    validate.checkLoginData, // validate
    utilities.handleErrors(accountController.accountLogin))

module.exports = router;