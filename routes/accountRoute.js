const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const validate = require('../utilities/account-validation');
const utilities = require("../utilities/")


/* *****************
*** GET ROUTES ***
****************** */

// Login view
router.get('/login', 
    utilities.handleErrors(accountController.buildLogin))

// Logout view
router.get("/logout", accountController.logout)

// Register view
router.get('/register', 
    utilities.handleErrors(accountController.buildRegister))

// Management view
router.get('/management', 
    //utilities.checkAccountTypeJWT, 
    utilities.checkLogin, // check login data
    utilities.handleErrors(accountController.buildManagement))

// UPDATE view
router.get('/update/:accountId', 
    utilities.handleErrors(accountController.buildUpdate))


/* *****************
*** POST ROUTES ***
****************** */


/* *****************
* Regier account with validation check
****************** */
router.post('/register', 
    validate.registationRules(), 
    validate.checkRegData, // validate
    utilities.handleErrors(accountController.registerAccount))


/* *****************
* Login account with validation check
****************** */
router.post('/login', 
    validate.loginRules(), 
    validate.checkLoginData, // validate
    utilities.handleErrors(accountController.accountLogin))


/* *****************
* UPDATE account information
****************** */
router.post('/update',
    utilities.handleErrors(accountController.updateAccountInformation)
)

/* *****************
* UPDATE account password
****************** */
router.post('/update-p',
    utilities.handleErrors(accountController.updateAccountPassword)
)



module.exports = router;