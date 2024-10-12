const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by single inv_id
 * ************************** */
invCont.buildSingleVehicle = async function (req, res, next) {
  const inv_id = req.params.invId // gets URL param #
  const data = await invModel.getClassificationById(inv_id)
  const html = await utilities.buildSingleVehicle(data)
  let nav = await utilities.getNav()
  const vehicle = data.inv_year + ' ' + data.inv_make + ' ' + data.inv_model 
  res.render("./inventory/singleClassification", { // sends to ejs file for output
    title: vehicle,
    nav,
    html,
  })
}

invCont.renderManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management",
    nav,
    errors: null,
  })
}

// render add-classification view
invCont.renderClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Add classification to list
 * ************************** */
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const unit = await invModel.addClassificationModel(classification_name)
  let nav = await utilities.getNav()
  if (unit){
    req.flash(
      "notice", 'Congratulations, you did it!.')
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
  
    })
  } else {
    req.flash("notice", "Sorry, adding classification failed!")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}


// display add-inventory view
invCont.renderInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add inventory",
    nav,
  })
}


module.exports = invCont