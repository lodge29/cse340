const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}


  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.registationRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage("Please provide a valid first name using only letters."), 
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isString()
        .isLength({ min: 2 })
        .withMessage("Please provide a valid last name using only letters."),
  
      // valid email is required and cannot already exist in the DB
      body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email: name@domain.com"),
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 5,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Please provide a valid password: 5 min, 1 lowercase, 1 uppercase, 1 number, and 1 symbol."),
    ]
  }

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        account_firstname,
        account_lastname,
        account_email,
      })
      return
    }
    next()
  }

  /*  **********************************
  *  login Data Validation Rules
  * ********************************* */
  validate.loginRules = () => {
    return [
      
      body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("Please provide a valid email: name@domain.com"),
  
      
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 5,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Please provide a valid password: 5 min, 1 lowercase, 1 uppercase, 1 number, and 1 symbol."),
    ]
  }

    /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    
    })
    return
  }
  next()
}
  
  module.exports = validate