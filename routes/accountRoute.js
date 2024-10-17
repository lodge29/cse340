const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const validate = require('../utilities/account-validation');




router.get('/login', accountController.buildLogin)
router.get('/register', accountController.buildRegister)
router.get('/management', accountController.buildManagement)

router.post('/register', validate.registationRules(), validate.checkRegData, accountController.registerAccount)
router.post('/login', validate.loginRules(), validate.checkLoginData, accountController.accountLogin)

module.exports = router;