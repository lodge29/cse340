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
  const classificationList = await utilities.buildClassificationList()
  let nav = await utilities.getNav()
  if (unit){
    req.flash(
      "notice", 'Congratulations, you did it!.')
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
      classificationList
  
    })
  } else {
    req.flash("notice", "Sorry, adding classification failed!")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

invCont.renderAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null
  })
}


invCont.addInventory = async function (req, res, next) {
  const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
  const inv = await invModel.addInventoryModel( 
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year,
    inv_miles, 
    inv_color,
    classification_id
  )
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList();
  if (inv){
    req.flash(
      "notice", 'Congratulations, you did it!.')
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
      classificationList
    })
  } else {
    req.flash("notice", "Sorry, adding inventory items failed!")
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

// render management view
invCont.renderManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Management",
    nav,
    errors: null,
    classificationList,
  })
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getClassificationById(inv_id)
  const classificationList = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
    
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationList = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
    })
  }
}


module.exports = invCont