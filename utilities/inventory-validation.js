const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const flash = require('connect-flash');
  const validate = {}

    /*  **********************************
  *  Inventory Data Validation Rules
  * ********************************* */
    validate.inventoryRules = () => {
      return [
        // classification name is required and must be string
        body("classification_name")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide a valid classification name.")
      ]
    }
  
    /* ******************************
   * Check data and return errors or continue to add classification
   * ***************************** */
  validate.checkInvData = async (req, res, next) => {
      const { classification_name } = req.body
      //let errors = []
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
          errors: errors.array(),
          title: "Add Classification",
          nav,
          classification_name
        })
        return
      }
      next()
    }
    
    module.exports = validate