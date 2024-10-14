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

    /*  **********************************
  *  ADD Inventory Data Validation Rules
  * ********************************* */
    validate.addInventoryRules = () => {
      return [
        // classification name is required and must be string
        body("inv_make")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a valid MAKE."),
          body("inv_model")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a valid MODEL."),
          body("inv_year")
          .trim()
          .isInt()
          .escape()
          .notEmpty()
          .isLength({ min: 4, max: 4 })
          .withMessage("Please provide a valid YEAR."),
          body("inv_description")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide a valid DESCRIPTION."),
          body("inv_image")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide a valid IMAGE PATH"),
          body("inv_thumbnail")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide a valid THUMBNAIL PATH"),
          body("inv_price")
          .trim()
          .isInt()
          .escape()
          .notEmpty()
          .isLength({ min: 4 })
          .withMessage("Please provide a valid PRICE."),
          body("inv_miles")
          .trim()
          .isInt()
          .escape()
          .notEmpty()
          .isLength({ min: 1 })
          .withMessage("Please provide valid MILES."),
          body("inv_color")
          .trim()
          .isString()
          .escape()
          .notEmpty()
          .isLength({ min: 2 })
          .withMessage("Please provide a valid COLOR."),
          
      ]
    }
  
    /* ******************************
   * Check data and return errors or continue to add classification
   * ***************************** */
  validate.checkInvData = async (req, res, next) => {
      const { classification_name } = req.body
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

    validate.checkAddInvData = async (req, res, next) => {
      const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList();
        res.render("inventory/add-inventory", {
          errors: errors.array(),
          title: "Add Inventory",
          nav,
          classificationList,
          inv_make, 
          inv_model, 
          inv_year, 
          inv_description, 
          inv_image, 
          inv_thumbnail, 
          inv_price, 
          inv_miles, 
          inv_color,
        })
        return
      }
      next()
    }
    
    module.exports = validate