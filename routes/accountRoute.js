const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation');




router.get('/login', accountController.buildLogin)
router.get('/register', accountController.buildRegister)
router.get('/management', accountController.buildManagement)

router.post('/register', regValidate.registationRules(), regValidate.checkRegData, accountController.registerAccount)
router.post('/login', regValidate.loginRules(), regValidate.checkLoginData, accountController.accountLogin)

module.exports = router;